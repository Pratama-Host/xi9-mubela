/* ================================================================
   halaman/beranda/skrip.js — TKJ XI-9 | Homepage Scripts
   ================================================================ */
import { G } from "../../pokok/skrip/pengaturan.js";
import {
  initReveal,
  animateTyping,
  animateCounter,
  renderAvatar,
  URLValidator,
  enableFocusTrap,
  disableFocusTrap,
} from "../../pokok/skrip/alat.js";

function mulaiHalamanIndeks() {
  const intro =
    document.getElementById(
      "intro",
    );
  const bar =
    document.getElementById(
      "intro-bar",
    );
  const pct =
    document.getElementById(
      "intro-pct",
    );
  const sub =
    document.getElementById(
      "intro-sub",
    );
  const main =
    document.getElementById(
      "main-content",
    );

  if (!intro) {
    tampilkanKontenIndeks();
    return;
  }
  if (
    sessionStorage.getItem(
      "tkj-intro-done",
    )
  ) {
    intro.style.display = "none";
    if (main)
      main.style.visibility =
        "visible";
    tampilkanKontenIndeks();
    return;
  }

  const phrases = [
    "Initializing TKJ XI-9...",
    "Loading modules...",
    "Connecting network...",
    "Rendering interface...",
    "ACCESS GRANTED",
  ];
  const terminalLogs = [
    "root@xi9:~# systemctl start kernel",
    "Loading neural_net.so... [OK]",
    "root@xi9:~# mount /dev/brain /mnt/wisdom",
    "Bypassing standard protocols...",
    "root@xi9:~# grep -r 'innovation' /usr/lib",
  ];
  let progress = 0,
    phaseIdx = 0,
    logIdx = 0;
  document.body.style.overflow =
    "hidden";
  if (main)
    main.style.visibility =
      "hidden";
  let terminal =
    document.getElementById(
      "intro-terminal",
    );
  if (!terminal && intro) {
    const body =
      intro.querySelector(
        ".intro-body",
      );
    if (body) {
      terminal =
        document.createElement(
          "div",
        );
      terminal.id =
        "intro-terminal";
      terminal.className =
        "intro-terminal";
      body.appendChild(terminal);
    }
  }
  const TOTAL_DURATION = 4200,
    INTERVAL = 50;
  const startTime = Date.now();
  const timer = setInterval(() => {
    const elapsed =
      Date.now() - startTime;
    let tp =
      (elapsed / TOTAL_DURATION) *
      100;
    if (Math.random() > 0.85)
      tp +=
        (Math.random() - 0.5) * 5;
    progress = Math.min(
      100,
      Math.max(progress, tp),
    );
    if (bar) {
      bar.style.width =
        progress + "%";
      bar.setAttribute(
        "aria-valuenow",
        Math.floor(progress),
      );
    }
    if (pct)
      pct.textContent =
        Math.floor(progress) + "%";
    const nextPhase = Math.min(
      Math.floor(
        (progress / 100) *
          phrases.length,
      ),
      phrases.length - 1,
    );
    if (nextPhase !== phaseIdx) {
      phaseIdx = nextPhase;
      if (sub)
        sub.textContent =
          phrases[phaseIdx];
    }
    if (
      terminal &&
      Math.random() > 0.92 &&
      logIdx < terminalLogs.length
    ) {
      const p =
        document.createElement(
          "div",
        );
      p.textContent =
        terminalLogs[logIdx++];
      p.style.cssText =
        "opacity:0;transform:translateY(5px);transition:all 0.2s ease";
      terminal.appendChild(p);
      setTimeout(() => {
        p.style.opacity = "1";
        p.style.transform =
          "translateY(0)";
      }, 10);
      if (
        terminal.children.length >
        3
      )
        terminal.removeChild(
          terminal.firstChild,
        );
    }
    if (progress >= 100) {
      clearInterval(timer);
      if (sub)
        sub.textContent =
          "ACCESS GRANTED";
      if (bar)
        bar.style.width = "100%";
      setTimeout(() => {
        intro.classList.add("out");
        if (main)
          main.style.visibility =
            "visible";
        sessionStorage.setItem(
          "tkj-intro-done",
          "1",
        );
        document
          .getElementById(
            "replay-intro-tombol",
          )
          ?.classList.add(
            "terlihat",
          );
        setTimeout(() => {
          intro.style.display =
            "none";
          document.body.style.overflow =
            "";
          tampilkanKontenIndeks();
        }, 800);
      }, 600);
    }
  }, INTERVAL);
}

function tampilkanKontenIndeks() {
  renderStats();
  renderGuruSection();
  const el =
    document.getElementById(
      "slogan-pahlawan",
    );
  if (el) {
    const text =
      (typeof G !== "undefined" &&
        G.sloganHero) ||
      el?.dataset?.fallback ||
      (el && el.textContent) ||
      "";
    if (text)
      animateTyping(el, text);
  }
  initKenaliKamiIntro();
  const qlCount =
    document.getElementById(
      "ql-member-count",
    );
  if (
    qlCount &&
    typeof G !== "undefined" &&
    Array.isArray(G.namaSiswa)
  )
    qlCount.textContent =
      G.namaSiswa.length +
      " siswa";
}

function renderStats() {
  const grid =
    document.getElementById(
      "strip-statistik",
    );
  if (
    !grid ||
    typeof G === "undefined" ||
    !Array.isArray(G.stats)
  )
    return;
  grid.innerHTML = G.stats
    .map(
      (s) =>
        `<div class="stat-cell reveal"><div class="stat-num" data-target="${Number(s.angka) || 0}" data-suffix="${s.suffix || ""}">${Number(s.angka) || 0}${s.suffix || ""}</div><div class="stat-lbl">${s.label || ""}</div></div>`,
    )
    .join("");
  initReveal();
  setTimeout(() => {
    grid
      .querySelectorAll(
        ".stat-num[data-target]",
      )
      .forEach((el) => {
        animateCounter(
          el,
          parseInt(
            el.dataset.target,
            10,
          ),
        );
      });
  }, 300);
}

function renderGuruSection() {
  if (
    typeof G === "undefined" ||
    !Array.isArray(G.guru)
  )
    return;
  const grid =
    document.querySelector(
      "#guru-section .grid-guru",
    );
  if (!grid) return;
  const frag =
    document.createDocumentFragment();
  G.guru.forEach((g, i) => {
    const card =
      document.createElement(
        "div",
      );
    card.className =
      "card guru-card card-accent-top reveal";
    card.style.setProperty(
      "--d",
      `${i * 0.08}s`,
    );
    const barsHTML = (
      g.expertise || []
    )
      .map(
        (e) =>
          `<div class="guru-bar-item"><div class="guru-bar-meta"><span>${e.label}</span><span>${e.level}%</span></div><div class="bar-bg"><div class="bar-fill" data-level="${e.level}"></div></div></div>`,
      )
      .join("");
    card.innerHTML = `
      <div class="avatar lg avatar-ring" style="margin:0 auto 14px">
        ${renderAvatar(g, "lg")}
      </div>
      <div style="text-align:center;margin-bottom:8px">
        <div style="font-weight:700;font-size:var(--text-md);color:var(--text-1)">${g.nama}</div>
        <span class="chip" style="margin-top:4px">${g.mapel}</span>
      </div>
      <div class="guru-role">${g.peran}</div>
      <blockquote class="guru-quote">${g.quote}</blockquote>
      <div class="guru-power-label">// POWER LEVEL</div>
      <div class="guru-bars">${barsHTML}</div>
    `;
    frag.appendChild(card);
  });
  grid.appendChild(frag);
  initReveal();
  setTimeout(() => {
    grid
      .querySelectorAll(
        ".bar-fill[data-level]",
      )
      .forEach(
        (bar) =>
          (bar.style.width =
            bar.dataset.level +
            "%"),
      );
  }, 400);
}

function initKenaliKamiIntro() {
  const trigger =
    document.querySelector(
      '.hero-cta a[href*="developer"]',
    );
  if (
    !trigger ||
    document.getElementById(
      "about-intro-modal",
    )
  )
    return;
  const modal =
    document.createElement("div");
  modal.id = "about-intro-modal";
  modal.className =
    "halaman-modal";
  modal.innerHTML = `<div class="panel-modal-halaman" role="dialog" aria-modal="true"><button type="button" class="tutup-modal" aria-label="Tutup intro">×</button><div class="lencana-modal">Kenali Kami</div><h2>Sebelum masuk, kenali kami lebih dulu</h2><p>Temukan visi, misi, dan semangat TKJ XI-9 sebelum melangkah ke halaman profil kami.</p><div class="aksi-modal"><button type="button" class="tombol tombol-utama" id="about-intro-confirm">Masuk ke Kenali Kami</button><button type="button" class="tombol tombol-garis" id="about-intro-dismiss">Nanti saja</button></div></div>`;
  document.body.appendChild(modal);
  const panel =
    modal.querySelector(
      ".panel-modal-halaman",
    );
  const confirmBtn =
    modal.querySelector(
      "#about-intro-confirm",
    );
  const dismissBtn =
    modal.querySelector(
      "#about-intro-dismiss",
    );
  const tutupBtn =
    modal.querySelector(
      ".tutup-modal",
    );
  const showModal = () => {
    modal.classList.add(
      "terlihat",
    );
    document.body.style.overflow =
      "hidden";
    enableFocusTrap(panel);
    confirmBtn?.focus();
  };
  const hideModal = () => {
    modal.classList.remove(
      "terlihat",
    );
    document.body.style.overflow =
      "";
    disableFocusTrap();
    trigger.focus();
  };
  trigger.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      showModal();
    },
  );
  tutupBtn?.addEventListener(
    "click",
    hideModal,
  );
  dismissBtn?.addEventListener(
    "click",
    hideModal,
  );
  modal.addEventListener(
    "click",
    (e) => {
      if (e.target === modal)
        hideModal();
    },
  );
  confirmBtn?.addEventListener(
    "click",
    () => {
      hideModal();
      window.location.href =
        trigger.href;
    },
  );
}

document.addEventListener(
  "DOMContentLoaded",
  mulaiHalamanIndeks,
);
