/* ================================================================
   halaman/struktur/skrip.js — TKJ XI-9
   ================================================================ */
import { G } from "../../pokok/skrip/pengaturan.js";
import {
  initReveal,
  renderAvatar,
  enableFocusTrap,
  disableFocusTrap,
} from "../../pokok/skrip/alat.js";

document.addEventListener("DOMContentLoaded", () => {
  renderOrganigram();
  initReveal();
  initStructureLightbox();
});

// Mencari data lengkap anggota berdasarkan nama (untuk profil, foto, dll)
function getExtendedMemberData(nama) {
  if (!G.namaSiswa) return null;
  return (
    G.namaSiswa.find((s) => s.nama.toLowerCase() === nama.toLowerCase()) || null
  );
}

function createOrgCard(member, isWali = false, delayIdx = 0) {
  const ext = isWali ? null : getExtendedMemberData(member.nama);

  const fotoSrc = member.foto || (ext ? ext.foto : "");
  const profilDesc = member.desc || (ext ? ext.desc : "");
  const sosmed = ext && ext.social ? ext.social : null;

  // Wrapper — tidak punya clip-path, sehingga garis konektor bebas keluar
  const wrap = document.createElement("div");
  wrap.className = `org-card-wrap ${isWali ? "is-wali-wrap" : "is-child-wrap"}`;
  wrap.style.setProperty("--d", `${delayIdx * 0.15}s`);

  const card = document.createElement("div");
  card.className = `org-card reveal ${isWali ? "is-wali" : ""}`;
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");

  const avatarWrap = document.createElement("div");
  avatarWrap.className = "avatar lg";
  avatarWrap.style.marginBottom = "8px";
  avatarWrap.innerHTML = renderAvatar(member, "lg");

  const nameEl = document.createElement("div");
  nameEl.className = "org-card-name";
  nameEl.textContent = member.nama || "—";

  const posEl = document.createElement("div");
  posEl.className = "org-card-pos";
  posEl.textContent = member.jabatan || "Anggota";

  card.appendChild(avatarWrap);
  card.appendChild(nameEl);
  card.appendChild(posEl);

  if (profilDesc) {
    const descEl = document.createElement("div");
    descEl.className = "org-card-desc";
    descEl.textContent = profilDesc;
    card.appendChild(descEl);
  }

  if (sosmed && Object.keys(sosmed).length > 0) {
    const socWrap = document.createElement("div");
    socWrap.className = "org-card-social";
    let hasValidLinks = false;
    for (const [platform, link] of Object.entries(sosmed)) {
      if (link && link !== "#") {
        hasValidLinks = true;
        const a = document.createElement("a");
        a.href = link;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.innerHTML = `<i class="fab fa-${platform}" aria-hidden="true"></i>`;
        a.setAttribute("aria-label", `Profil ${platform} ${member.nama}`);
        socWrap.appendChild(a);
      }
    }
    if (hasValidLinks) card.appendChild(socWrap);
  }

  card.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    if (window.terbukaLightboxStruktur) {
      window.terbukaLightboxStruktur(fotoSrc, member.nama, member.jabatan, profilDesc);
    }
  });

  wrap.appendChild(card);
  return wrap;
}

function createConnector(delayIdx = 0) {
  const conn = document.createElement("div");
  conn.className = "org-connector reveal";
  conn.style.setProperty("--d", `${delayIdx * 0.15}s`);
  return conn;
}

function renderOrganigram() {
  const wrap = document.getElementById("org-wrap");
  if (!wrap) return;

  const frag = document.createDocumentFragment();

  // Baris 1: Wali Kelas (Root — tidak punya konektor atas)
  if (G.waliKelas) {
    const rowWali = document.createElement("div");
    rowWali.className = "org-row is-root";
    const dataWali = { ...G.waliKelas, jabatan: "Wali Kelas" };
    rowWali.appendChild(createOrgCard(dataWali, true, 0));
    frag.appendChild(rowWali);
  }

  // Baris 2: Ketua & Wakil (Indeks 0 & 1 dari strukturOrg)
  if (G.strukturOrg && G.strukturOrg.length >= 2) {
    const rowKetua = document.createElement("div");
    rowKetua.className = "org-row";
    rowKetua.appendChild(createOrgCard(G.strukturOrg[0], false, 1));
    rowKetua.appendChild(createOrgCard(G.strukturOrg[1], false, 2));
    frag.appendChild(rowKetua);
  }

  // Baris 3: Sekretaris & Bendahara (Indeks 2,3,4,5 dari strukturOrg)
  if (G.strukturOrg && G.strukturOrg.length >= 6) {
    const rowSekBen = document.createElement("div");
    rowSekBen.className = "org-row";
    rowSekBen.appendChild(createOrgCard(G.strukturOrg[2], false, 3));
    rowSekBen.appendChild(createOrgCard(G.strukturOrg[3], false, 4));
    rowSekBen.appendChild(createOrgCard(G.strukturOrg[4], false, 5));
    rowSekBen.appendChild(createOrgCard(G.strukturOrg[5], false, 6));
    frag.appendChild(rowSekBen);
  }

  // Baris 4: Keamanan dkk (Indeks 6,7,dst — tidak punya konektor bawah)
  if (G.strukturOrg && G.strukturOrg.length >= 8) {
    const rowKeamanan = document.createElement("div");
    rowKeamanan.className = "org-row is-last-row";
    for (let i = 6; i < G.strukturOrg.length; i++) {
      rowKeamanan.appendChild(
        createOrgCard(G.strukturOrg[i], false, 7 + (i - 6)),
      );
    }
    frag.appendChild(rowKeamanan);
  }

  wrap.innerHTML = "";
  wrap.appendChild(frag);
}

function initStructureLightbox() {
  const lightbox = document.getElementById("structure-photo-lightbox");
  const tutupBtn = document.getElementById("structure-photo-lightbox-tutup");
  const img = document.getElementById("structure-photo-lightbox-img");

  if (!lightbox || !tutupBtn || !img) return;

  // Menambahkan elemen caption di dalam lightbox agar data jabatan & profil dapat ditampilkan membesar
  let captionDiv = document.getElementById("structure-lightbox-caption");
  if (!captionDiv) {
    captionDiv = document.createElement("div");
    captionDiv.id = "structure-lightbox-caption";
    captionDiv.className = "bilah-keterangan-jendela";
    lightbox.appendChild(captionDiv);
  }

  window.terbukaLightboxStruktur = function (src, nama, jabatan, profil) {
    if (!src) return;
    img.src = src;

    // Terapkan seluruh data: nama, jabatan, profil ke dalam UI
    captionDiv.innerHTML = `
      <div class="lb-nama">${nama}</div>
      <div class="lb-jabatan">${jabatan}</div>
      ${profil ? `<div class="lb-profil">${profil}</div>` : ""}
    `;

    lightbox.classList.add("terbuka");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    tutupBtn?.focus();
    enableFocusTrap(lightbox);
  };

  function tutupLightbox() {
    lightbox.classList.remove("terbuka");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    disableFocusTrap();
  }

  tutupBtn.addEventListener("click", tutupLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) tutupLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("terbuka")) {
      tutupLightbox();
    }
  });
}

