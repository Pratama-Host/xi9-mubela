/* ================================================================
   halaman/anggota/skrip.js — TKJ XI-9
   Dynamic Member Rendering, Search, Modal & WhatsApp Audio Player
   ================================================================ */
import { G } from "../../pokok/skrip/pengaturan.js";
import {
  initReveal,
  enableFocusTrap,
  disableFocusTrap,
  renderAvatar,
  URLValidator,
  RevealObserver,
} from "../../pokok/skrip/alat.js";

document.addEventListener(
  "DOMContentLoaded",
  () => {
    renderMemberCards();
    initReveal();
    initMembersInteractions();
  },
);

/* ================================================================
   RENDER MEMBER CARDS FROM G.namaSiswa
   ================================================================ */
function renderMemberCards() {
  const grid =
    document.getElementById(
      "members-grid",
    );
  if (!grid || !G?.namaSiswa)
    return;

  const frag =
    document.createDocumentFragment();

  G.namaSiswa.forEach(
    (member, i) => {
      const card =
        document.createElement(
          "div",
        );
      card.className =
        "card member-card card-accent-top reveal";
      card.dataset.nis =
        member.nis;
      card.style.setProperty(
        "--d",
        `${(i % 5) * 0.05}s`,
      );
      card.setAttribute(
        "role",
        "button",
      );
      card.setAttribute(
        "tabindex",
        "0",
      );
      card.setAttribute(
        "aria-label",
        `Lihat detail ${member.nama}`,
      );

      const avatarWrap =
        document.createElement(
          "div",
        );
      avatarWrap.className =
        "avatar lg avatar-ring";
      avatarWrap.innerHTML =
        renderAvatar(member, "lg");

      const nameEl =
        document.createElement(
          "div",
        );
      nameEl.className =
        "member-card-name";
      nameEl.textContent =
        member.nama;

      let jabatanText = "Anggota";
      const orgMember =
        G.strukturOrg?.find(
          (s) =>
            s.nama === member.nama,
        );
      if (
        orgMember &&
        orgMember.jabatan
      ) {
        jabatanText =
          orgMember.jabatan;
      }

      const jabatanEl =
        document.createElement(
          "div",
        );
      jabatanEl.className =
        "member-card-role";
      jabatanEl.textContent =
        jabatanText;
      jabatanEl.style.fontSize =
        "0.75rem";
      jabatanEl.style.color =
        "var(--text-2)";
      jabatanEl.style.marginBottom =
        "8px";

      const nisEl =
        document.createElement(
          "div",
        );
      nisEl.className =
        "member-card-nis mono";
      nisEl.textContent =
        member.nis;

      card.appendChild(avatarWrap);
      card.appendChild(nameEl);
      card.appendChild(jabatanEl);
      card.appendChild(nisEl);
      frag.appendChild(card);
    },
  );

  grid.innerHTML = "";
  grid.appendChild(frag);
}

/* ================================================================
   INTERACTIONS: SEARCH, SLIDER, MODAL, LIGHTBOX
   ================================================================ */
function initMembersInteractions() {
  const grid =
    document.getElementById(
      "members-grid",
    );
  const search =
    document.getElementById(
      "member-search",
    );
  const clearBtn =
    document.getElementById(
      "hapus-pencarian",
    );
  const countEl =
    document.getElementById(
      "member-count",
    );
  let rafId = null;

  function getCards() {
    return Array.from(
      grid?.querySelectorAll(
        ".member-card",
      ) || [],
    );
  }

  const totalSiswa =
    G?.namaSiswa?.length || 0;

  // ── Search ──────────────────────────────────────────────────
  function render(filter = "") {
    const q = filter
      .toLowerCase()
      .trim();
    let matchCount = 0;

    getCards().forEach((card) => {
      const name =
        card
          .querySelector(
            ".member-card-name",
          )
          ?.textContent.toLowerCase() ||
        "";
      if (!q || name.includes(q)) {
        card.style.display = "";
        matchCount++;
      } else {
        card.style.display =
          "none";
      }
    });

    if (countEl) {
      countEl.textContent = q
        ? `Menampilkan ${matchCount} dari ${totalSiswa} anggota`
        : `Semua ${totalSiswa} anggota`;
    }
  }

  if (countEl)
    countEl.textContent = `Semua ${totalSiswa} anggota`;

  if (search) {
    search.addEventListener(
      "input",
      () => {
        if (rafId)
          cancelAnimationFrame(
            rafId,
          );
        rafId =
          requestAnimationFrame(
            () => {
              render(search.value);
              clearBtn?.classList.toggle(
                "terlihat",
                search.value
                  .length > 0,
              );
            },
          );
      },
    );

    // Keyboard shortcut: "/" to focus search
    document.addEventListener(
      "keydown",
      (e) => {
        const tag =
          document.activeElement?.tagName?.toLowerCase();
        if (
          e.key === "/" &&
          tag !== "input" &&
          tag !== "textarea" &&
          !e.ctrlKey &&
          !e.metaKey
        ) {
          e.preventDefault();
          search.focus();
        }
      },
    );
  }

  document
    .querySelector(
      ".bungkus-pencarian",
    )
    ?.addEventListener(
      "click",
      (e) => {
        if (
          e.target.closest(
            "#hapus-pencarian",
          )
        ) {
          if (search) {
            search.value = "";
            search.dispatchEvent(
              new Event("input"),
            );
            search.focus();
          }
        }
      },
    );

  // ── Slider (Horizontal Scroll) ──────────────────────────────
  if (grid) {
    grid.addEventListener(
      "wheel",
      (e) => {
        if (
          Math.abs(e.deltaY) <
          Math.abs(e.deltaX)
        )
          return;
        e.preventDefault();
        const scrollAmount =
          e.deltaY > 0 ? 80 : -80;
        grid.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      },
      { passive: false },
    );
  }

  const prevBtn =
    document.querySelector(
      ".members-prev",
    );
  const nextBtn =
    document.querySelector(
      ".members-next",
    );
  if (prevBtn && nextBtn && grid) {
    prevBtn.addEventListener(
      "click",
      () => {
        grid.scrollBy({
          left: -200,
          behavior: "smooth",
        });
      },
    );
    nextBtn.addEventListener(
      "click",
      () => {
        grid.scrollBy({
          left: 200,
          behavior: "smooth",
        });
      },
    );
  }

  // ── Modal Detail ────────────────────────────────────────────
  const modal =
    document.getElementById(
      "member-modal",
    );
  const modalClose =
    document.getElementById(
      "member-modal-tutup",
    );
  const modalAvatar =
    document.getElementById(
      "modal-avatar",
    );
  const modalName =
    document.getElementById(
      "modal-name",
    );
  const modalNis =
    document.getElementById(
      "modal-nis",
    );
  const modalDesc =
    document.getElementById(
      "modal-desc",
    );
  const modalSocial =
    document.getElementById(
      "modal-social",
    );
  const modalAudio =
    document.getElementById(
      "modal-audio",
    );

  // ── Photo Lightbox ──────────────────────────────────────────
  const photoLightbox =
    document.getElementById(
      "member-photo-lightbox",
    );
  const photoLightboxClose =
    document.getElementById(
      "member-photo-lightbox-tutup",
    );
  const photoLightboxImg =
    document.getElementById(
      "member-photo-lightbox-img",
    );
  let currentMemberPhotoUrl = "";
  let currentAudioInstance = null;

  function terbukaPhotoLightbox() {
    if (
      !photoLightbox ||
      !currentMemberPhotoUrl
    )
      return;
    photoLightboxImg.src =
      currentMemberPhotoUrl;
    photoLightbox.classList.add(
      "terbuka",
    );
    photoLightbox.setAttribute(
      "aria-hidden",
      "false",
    );
    document.body.style.overflow =
      "hidden";
    photoLightboxClose?.focus();
    enableFocusTrap(photoLightbox);
  }

  function tutupPhotoLightbox() {
    if (!photoLightbox) return;
    photoLightbox.classList.remove(
      "terbuka",
    );
    photoLightbox.setAttribute(
      "aria-hidden",
      "true",
    );
    document.body.style.overflow =
      "";
    disableFocusTrap();
  }

  photoLightboxClose?.addEventListener(
    "click",
    tutupPhotoLightbox,
  );
  photoLightbox?.addEventListener(
    "click",
    (e) => {
      if (
        e.target === photoLightbox
      )
        tutupPhotoLightbox();
    },
  );

  modalAvatar?.addEventListener(
    "click",
    () => {
      if (currentMemberPhotoUrl)
        terbukaPhotoLightbox();
    },
  );

  // ── WhatsApp Audio Player Builder ───────────────────────────
  function buildAudioPlayer(
    member,
  ) {
    if (!member.audio) return "";

    const safeAudio =
      URLValidator.sanitize(
        member.audio,
      );
    if (!safeAudio) return "";

    const trackTitle =
      member.namaAudio ||
      member.nama;
    const trackDesc =
      member.descAudio ||
      member.desc ||
      "";

    // Build waveform bars (random heights for visual variety)
    const bars = Array.from(
      { length: 20 },
      () =>
        `<span style="height:${20 + Math.random() * 80}%"></span>`,
    ).join("");

    return `
      <div class="whatsapp-audio-player" data-src="${safeAudio}" aria-label="Pemutar audio ${trackTitle}">
        <div class="audio-track-info">
          <div class="player-track-title">${trackTitle}</div>
          <p class="player-track-artist">${trackDesc}</p>
        </div>
        <div class="audio-controls">
          <button class="audio-play-btn" aria-label="Putar audio" type="button">
            <span class="play-icon">▶</span>
          </button>
          <div class="audio-waveform">${bars}</div>
          <div class="audio-info">
            <span class="audio-duration">0:00</span>
            <span class="audio-speed">1x</span>
          </div>
        </div>
        <div class="audio-progress">
          <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-fill"></div>
          </div>
        </div>
        <div class="audio-speed-controls">
          <button class="speed-btn" data-speed="1" type="button" aria-label="Kecepatan 1x">1x</button>
          <button class="speed-btn" data-speed="1.5" type="button" aria-label="Kecepatan 1.5x">1.5x</button>
          <button class="speed-btn" data-speed="2" type="button" aria-label="Kecepatan 2x">2x</button>
        </div>
      </div>`;
  }

  function initAudioPlayerInModal() {
    const player =
      modalAudio?.querySelector(
        ".whatsapp-audio-player",
      );
    if (!player) return;

    const src = player.dataset.src;
    const playBtn =
      player.querySelector(
        ".audio-play-btn",
      );
    const playIcon =
      player.querySelector(
        ".play-icon",
      );
    const durationEl =
      player.querySelector(
        ".audio-duration",
      );
    const speedEl =
      player.querySelector(
        ".audio-speed",
      );
    const progressBar =
      player.querySelector(
        ".progress-bar",
      );
    const progressFill =
      player.querySelector(
        ".progress-fill",
      );
    const speedBtns =
      player.querySelectorAll(
        ".speed-btn",
      );

    if (currentAudioInstance) {
      currentAudioInstance.pause();
      currentAudioInstance = null;
    }

    const audio = new Audio(src);
    currentAudioInstance = audio;
    let isPlaying = false;

    function formatTime(s) {
      const m = Math.floor(s / 60);
      const sec = Math.floor(
        s % 60,
      );
      return `${m}:${sec.toString().padStart(2, "0")}`;
    }

    audio.addEventListener(
      "loadedmetadata",
      () => {
        durationEl.textContent =
          formatTime(
            audio.duration,
          );
      },
    );

    audio.addEventListener(
      "timeupdate",
      () => {
        if (!audio.duration)
          return;
        const pct =
          (audio.currentTime /
            audio.duration) *
          100;
        progressFill.style.width =
          pct + "%";
        durationEl.textContent =
          formatTime(
            audio.currentTime,
          );
      },
    );

    audio.addEventListener(
      "ended",
      () => {
        isPlaying = false;
        playIcon.textContent = "▶";
        player.classList.remove(
          "playing",
        );
        progressFill.style.width =
          "0%";
        durationEl.textContent =
          formatTime(
            audio.duration,
          );
      },
    );

    playBtn?.addEventListener(
      "click",
      () => {
        if (isPlaying) {
          audio.pause();
          playIcon.textContent =
            "▶";
          player.classList.remove(
            "playing",
          );
        } else {
          audio
            .play()
            .catch(() => {});
          playIcon.textContent =
            "❚❚";
          player.classList.add(
            "playing",
          );
        }
        isPlaying = !isPlaying;
      },
    );

    progressBar?.addEventListener(
      "click",
      (e) => {
        if (!audio.duration)
          return;
        const rect =
          progressBar.getBoundingClientRect();
        const pct =
          (e.clientX - rect.left) /
          rect.width;
        audio.currentTime =
          pct * audio.duration;
      },
    );

    speedBtns.forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          const speed = parseFloat(
            btn.dataset.speed,
          );
          audio.playbackRate =
            speed;
          speedEl.textContent =
            speed + "x";
          speedBtns.forEach((b) =>
            b.classList.remove(
              "aktif",
            ),
          );
          btn.classList.add(
            "aktif",
          );
        },
      );
    });

    // Default speed active
    speedBtns[0]?.classList.add(
      "aktif",
    );
  }

  // ── Open Member Modal ───────────────────────────────────────
  function terbukaMemberModal(
    nis,
  ) {
    if (!modal || !G?.namaSiswa)
      return;

    const data = G.namaSiswa.find(
      (s) => s.nis === nis,
    );
    if (!data) return;

    // Cleanup previous audio
    if (currentAudioInstance) {
      currentAudioInstance.pause();
      currentAudioInstance = null;
    }

    // Name + NIS
    modalName.textContent =
      data.nama || "—";
    modalNis.textContent = `NIS: ${data.nis || ""}`;

    // Role (Jabatan)
    const modalRole =
      document.getElementById(
        "modal-role",
      );
    if (modalRole) {
      let roleText = "Anggota";
      const orgData =
        G.strukturOrg?.find(
          (s) =>
            s.nama === data.nama,
        );
      if (
        orgData &&
        orgData.jabatan
      ) {
        roleText = orgData.jabatan;
      }
      modalRole.textContent =
        roleText;
    }

    // Avatar
    const safePhotoUrl =
      URLValidator.sanitize(
        data.foto || "",
      );
    modalAvatar.innerHTML =
      renderAvatar(
        {
          foto: safePhotoUrl,
          nama: data.nama,
        },
        "lg",
      );
    currentMemberPhotoUrl =
      safePhotoUrl;
    modalAvatar.style.cursor =
      safePhotoUrl
        ? "pointer"
        : "default";

    // Description
    modalDesc.textContent =
      data.desc || "";

    // Social
    modalSocial.innerHTML = "";
    if (data.social) {
      Object.entries(
        data.social,
      ).forEach(
        ([platform, url]) => {
          if (!url || url === "#")
            return;
          const a =
            document.createElement(
              "a",
            );
          a.href = url;
          a.target = "_blank";
          a.rel =
            "noopener noreferrer";
          a.setAttribute(
            "aria-label",
            `${platform} ${data.nama}`,
          );
          a.innerHTML = `<i class="fab fa-${platform}" aria-hidden="true"></i>`;
          a.style.cssText =
            "color:var(--accent);font-size:1.2rem;transition:opacity 0.2s";
          modalSocial.appendChild(
            a,
          );
        },
      );
    }

    // Audio Player
    modalAudio.innerHTML =
      buildAudioPlayer(data);
    initAudioPlayerInModal();

    // Show modal
    modal.classList.add("terbuka");
    modal.setAttribute(
      "aria-hidden",
      "false",
    );
    document.body.style.overflow =
      "hidden";
    enableFocusTrap(modal);
    modalClose?.focus();
  }

  function tutupMemberModal() {
    if (!modal) return;
    if (currentAudioInstance) {
      currentAudioInstance.pause();
      currentAudioInstance = null;
    }
    modal.classList.remove(
      "terbuka",
    );
    modal.setAttribute(
      "aria-hidden",
      "true",
    );
    document.body.style.overflow =
      "";
    disableFocusTrap();
  }

  // ── Event Delegation ────────────────────────────────────────
  grid?.addEventListener(
    "click",
    (e) => {
      const card =
        e.target.closest(
          ".member-card",
        );
      if (!card) return;
      terbukaMemberModal(
        card.dataset.nis,
      );
    },
  );

  grid?.addEventListener(
    "keydown",
    (e) => {
      if (
        e.key === "Enter" ||
        e.key === " "
      ) {
        const card =
          e.target.closest(
            ".member-card",
          );
        if (!card) return;
        e.preventDefault();
        terbukaMemberModal(
          card.dataset.nis,
        );
      }
    },
  );

  modalClose?.addEventListener(
    "click",
    tutupMemberModal,
  );
  modal?.addEventListener(
    "click",
    (e) => {
      if (e.target === modal)
        tutupMemberModal();
    },
  );

  document.addEventListener(
    "keydown",
    (e) => {
      if (
        e.key === "Escape" &&
        photoLightbox?.classList.contains(
          "terbuka",
        )
      ) {
        tutupPhotoLightbox();
      } else if (
        e.key === "Escape" &&
        modal?.classList.contains(
          "terbuka",
        )
      ) {
        tutupMemberModal();
      }
    },
  );
}
