/* ================================================================
   pokok/skrip/utama.js — TKJ XI-9 | Main Entry Point (ESM)
   Mengimport dan mengorkestrasi semua modul
   ================================================================ */
"use strict";

import {
  mulaiTema,
  pasangPendengarTema,
} from "./tema.js";
import {
  tampilkanStatusKanvasJaringan,
  ambilStatusKanvas,
  aturStatusKanvas,
  perbaruiStatusTombolKanvas,
} from "./kanvas.js";
import {
  inisialisasiAudio,
  tampilkanStatusAudio,
  ambilStatusAudio,
  aturStatusAudio,
  perbaruiStatusTombolAudio,
} from "./audio.js";
import {
  initReveal,
  mulaiProgresGulir,
  mulaiKodeRahasia,
  initProgressBar,
  mulaiJam,
  showNotification,
  enableFocusTrap,
  disableFocusTrap,
  URLValidator,
  animateTyping,
  animateCounter,
  makeInitials,
  RevealObserver,
} from "./alat.js";

/* ================================================================
   GLOBAL: INJECT THEME BUTTON
   ================================================================ */
function mulaiTombolTemaHeader() {
  const topBarActions =
    document.querySelector(
      ".aksi-bilah-atas",
    );
  if (
    !topBarActions ||
    document.getElementById(
      "tombol-tema",
    )
  )
    return;
  const tombol =
    document.createElement(
      "button",
    );
  tombol.id = "tombol-tema";
  tombol.className = "tombol-tema";
  tombol.setAttribute(
    "aria-label",
    "Ganti tema",
  );
  tombol.setAttribute(
    "data-tooltip",
    "Toggle Tema (T)",
  );
  tombol.innerHTML = `<span class="pembungkus-ikon-tema"><i class="fas fa-moon" aria-hidden="true"></i></span>`;
  topBarActions.appendChild(
    tombol,
  );
}

/* ================================================================
   GLOBAL: INJECT CANVAS BUTTON
   ================================================================ */
function mulaiTombolKanvasHeader() {
  const topBarActions =
    document.querySelector(
      ".aksi-bilah-atas",
    );
  if (
    !topBarActions ||
    document.getElementById(
      "tombol-kanvas",
    )
  )
    return;
  const tombol =
    document.createElement(
      "button",
    );
  tombol.id = "tombol-kanvas";
  tombol.className =
    "tombol-tema alih-kanvas";
  tombol.setAttribute(
    "aria-label",
    "Toggle animasi latar",
  );
  tombol.setAttribute(
    "data-tooltip",
    "Toggle Animasi Latar",
  );
  tombol.innerHTML = `<span class="pembungkus-ikon-tema"><i class="fas fa-toggle-${ambilStatusKanvas() ? "on" : "off"}" aria-hidden="true"></i></span>`;
  tombol.addEventListener(
    "click",
    () => {
      const enabled =
        !ambilStatusKanvas();
      aturStatusKanvas(enabled);
      tampilkanStatusKanvasJaringan();
      perbaruiStatusTombolKanvas(
        tombol,
        enabled,
      );
    },
  );
  topBarActions.appendChild(
    tombol,
  );
}

/* ================================================================
   GLOBAL: INJECT AUDIO BUTTON
   ================================================================ */
function mulaiTombolAudioHeader() {
  const topBarActions =
    document.querySelector(
      ".aksi-bilah-atas",
    );
  if (
    !topBarActions ||
    document.getElementById(
      "tombol-audio",
    )
  )
    return;
  const tombol =
    document.createElement(
      "button",
    );
  tombol.id = "tombol-audio";
  tombol.className =
    "tombol-audio";
  tombol.setAttribute(
    "aria-label",
    "Toggle musik latar",
  );
  tombol.setAttribute(
    "data-tooltip",
    "Toggle Musik Latar",
  );
  tombol.innerHTML = `<span class="pembungkus-ikon-audio"><i class="fas fa-volume-${ambilStatusAudio() ? "up" : "mute"}" aria-hidden="true"></i></span>`;
  tombol.addEventListener(
    "click",
    () => {
      const enabled =
        !ambilStatusAudio();
      aturStatusAudio(enabled);
      tampilkanStatusAudio();
      perbaruiStatusTombolAudio(
        tombol,
        enabled,
      );
    },
  );
  topBarActions.appendChild(
    tombol,
  );
  perbaruiStatusTombolAudio(
    tombol,
    ambilStatusAudio(),
  );
}

/* ================================================================
   GLOBAL: HAMBURGER MENU
   ================================================================ */
function mulaiMenuHamburger() {
  const topBarActions =
    document.querySelector(
      ".aksi-bilah-atas",
    );
  if (
    !topBarActions ||
    document.getElementById(
      "hamburger-tombol",
    )
  )
    return;
  const isInPage =
    window.location.pathname.includes(
      "/halaman/",
    );
  const halamanPrefix = isInPage
    ? "../"
    : "./halaman/";
  const rootPrefix = isInPage
    ? "../../"
    : "./";
  const tombol =
    document.createElement(
      "button",
    );
  tombol.id = "hamburger-tombol";
  tombol.className =
    "hamburger-tombol";
  tombol.setAttribute(
    "aria-label",
    "Buka menu",
  );
  tombol.setAttribute(
    "aria-expanded",
    "false",
  );
  tombol.innerHTML =
    '<span class="hamburger-icon"><i class="fas fa-bars" aria-hidden="true"></i></span>';
  topBarActions.appendChild(
    tombol,
  );
  const menu =
    document.createElement("nav");
  menu.id = "menu-hamburger";
  menu.setAttribute(
    "aria-hidden",
    "true",
  );
  const items = [
    {
      href:
        rootPrefix + "index.html",
      text: "Home",
      icon: '<i class="fas fa-house"></i>',
    },
    {
      href:
        halamanPrefix +
        "pengembang/index.html",
      text: "Developer",
      icon: '<i class="fas fa-code"></i>',
    },
    {
      href:
        halamanPrefix +
        "struktur/index.html",
      text: "Struktur",
      icon: '<i class="fas fa-sitemap"></i>',
    },
    {
      href:
        halamanPrefix +
        "anggota/index.html",
      text: "Anggota",
      icon: '<i class="fas fa-users"></i>',
    },
    {
      href:
        halamanPrefix +
        "keahlian/index.html",
      text: "Skills",
      icon: '<i class="fas fa-code"></i>',
    },
    {
      href:
        halamanPrefix +
        "galeri/index.html",
      text: "Galeri",
      icon: '<i class="fas fa-images"></i>',
    },
    {
      href:
        halamanPrefix +
        "tkj/index.html",
      text: "TKJ",
      icon: '<i class="fas fa-network-wired"></i>',
    },
  ];
  menu.innerHTML = `<div class="panel-menu-hamburger"><button type="button" class="tutup-menu-hamburger" aria-label="Tutup menu"><i class="fas fa-times" aria-hidden="true"></i></button>${items.map((it) => `<a class="tautan-menu-hamburger" href="${it.href}"><span>${it.icon}</span><span>${it.text}</span></a>`).join("")}</div>`;
  document.body.appendChild(menu);
  const panel = menu.querySelector(
    ".panel-menu-hamburger",
  );
  const tutupBtn =
    menu.querySelector(
      ".tutup-menu-hamburger",
    );
  function terbuka() {
    tombol.setAttribute(
      "aria-expanded",
      "true",
    );
    menu.setAttribute(
      "aria-hidden",
      "false",
    );
    document.body.classList.add(
      "menu-terbuka",
    );
  }
  function tutup() {
    tombol.setAttribute(
      "aria-expanded",
      "false",
    );
    menu.setAttribute(
      "aria-hidden",
      "true",
    );
    document.body.classList.remove(
      "menu-terbuka",
    );
  }
  tombol.addEventListener(
    "click",
    (e) => {
      e.stopPropagation();
      tombol.getAttribute(
        "aria-expanded",
      ) === "true"
        ? tutup()
        : terbuka();
    },
  );
  menu.addEventListener(
    "click",
    tutup,
  );
  panel?.addEventListener(
    "click",
    (e) => e.stopPropagation(),
  );
  tutupBtn?.addEventListener(
    "click",
    tutup,
  );
  menu
    .querySelectorAll(
      ".tautan-menu-hamburger",
    )
    .forEach((link) =>
      link.addEventListener(
        "click",
        tutup,
      ),
    );
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape")
        tutup();
    },
  );
}

/* ================================================================
   GLOBAL: CLOCK
   ================================================================ */
function createGlobalClock() {
  if (
    document.getElementById(
      "global-clock",
    )
  )
    return;
  const el =
    document.createElement("div");
  el.id = "global-clock";
  el.setAttribute(
    "role",
    "status",
  );
  el.setAttribute(
    "aria-live",
    "polite",
  );
  el.setAttribute(
    "title",
    "Drag to move | Double-click to reset",
  );
  function fmt(d) {
    return d.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
    );
  }
  function update() {
    el.textContent = fmt(
      new Date(),
    );
  }
  update();
  setInterval(update, 1000);
  document.body.appendChild(el);
  const savedPos =
    localStorage.getItem(
      "tkj-clock-pos",
    );
  if (savedPos) {
    try {
      const pos =
        JSON.parse(savedPos);
      el.style.setProperty(
        "left",
        pos.x + "px",
        "important",
      );
      el.style.setProperty(
        "top",
        pos.y + "px",
        "important",
      );
    } catch {}
  }
  let isDragging = false,
    offsetX = 0,
    offsetY = 0;
  el.addEventListener(
    "pointerdown",
    (e) => {
      if (
        e.pointerType ===
          "mouse" &&
        e.button !== 0
      )
        return;
      e.preventDefault();
      isDragging = true;
      const rect =
        el.getBoundingClientRect();
      offsetX =
        e.clientX - rect.left;
      offsetY =
        e.clientY - rect.top;
      el.setPointerCapture(
        e.pointerId,
      );
      el.classList.add("dragging");
      el.style.cursor = "grabbing";
    },
  );
  document.addEventListener(
    "pointermove",
    (e) => {
      if (!isDragging) return;
      el.style.setProperty(
        "left",
        Math.max(
          0,
          Math.min(
            e.clientX - offsetX,
            window.innerWidth -
              el.offsetWidth,
          ),
        ) + "px",
        "important",
      );
      el.style.setProperty(
        "top",
        Math.max(
          56,
          Math.min(
            e.clientY - offsetY,
            window.innerHeight -
              60,
          ),
        ) + "px",
        "important",
      );
    },
  );
  document.addEventListener(
    "pointerup",
    (e) => {
      if (!isDragging) return;
      isDragging = false;
      el.classList.remove(
        "dragging",
      );
      el.style.cursor = "move";
      try {
        el.releasePointerCapture(
          e.pointerId,
        );
      } catch {}
      const l =
          getComputedStyle(
            el,
          ).left,
        t =
          getComputedStyle(el).top;
      localStorage.setItem(
        "tkj-clock-pos",
        JSON.stringify({
          x: parseInt(l),
          y: parseInt(t),
        }),
      );
    },
  );
  el.addEventListener(
    "dblclick",
    () => {
      el.style.setProperty(
        "left",
        "12px",
        "important",
      );
      el.style.setProperty(
        "top",
        "12px",
        "important",
      );
      localStorage.removeItem(
        "tkj-clock-pos",
      );
    },
  );
}

/* ================================================================
   GLOBAL: NETWORK STATUS
   ================================================================ */
function initNetworkStatus() {
  let badge =
    document.getElementById(
      "offline-badge",
    );
  if (!badge) {
    badge =
      document.createElement(
        "div",
      );
    badge.id = "offline-badge";
    badge.setAttribute(
      "role",
      "status",
    );
    badge.setAttribute(
      "aria-live",
      "polite",
    );
    badge.innerHTML =
      '<i class="fas fa-wifi" style="text-decoration:line-through" aria-hidden="true"></i><span>Mode Offline</span>';
    document.body.appendChild(
      badge,
    );
  }
  function update() {
    badge.classList.toggle(
      "terlihat",
      !navigator.onLine,
    );
  }
  window.addEventListener(
    "online",
    update,
  );
  window.addEventListener(
    "offline",
    update,
  );
  update();
}

/* ================================================================
   GLOBAL: BACK TO TOP
   ================================================================ */
function initBackToTop() {
  const tombol =
    document.getElementById(
      "back-to-top",
    );
  if (!tombol) return;
  window.addEventListener(
    "scroll",
    () =>
      tombol.classList.toggle(
        "terlihat",
        window.scrollY > 300,
      ),
    { passive: true },
  );
  tombol.addEventListener(
    "click",
    () =>
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      }),
  );
}

/* ================================================================
   GLOBAL: KEYBOARD SHORTCUTS
   ================================================================ */
function initKeyboardShortcuts() {
  document.addEventListener(
    "keydown",
    (e) => {
      const tag =
        document.activeElement?.tagName?.toLowerCase();
      const isInput =
        tag === "input" ||
        tag === "textarea" ||
        tag === "select";
      if (
        e.key === "t" &&
        !isInput &&
        !e.ctrlKey &&
        !e.metaKey
      )
        document
          .getElementById(
            "tombol-tema",
          )
          ?.click();
      if (
        e.key === "Escape" &&
        isInput
      ) {
        const s =
          document.getElementById(
            "member-search",
          );
        if (
          s &&
          document.activeElement ===
            s
        ) {
          s.value = "";
          s.dispatchEvent(
            new Event("input"),
          );
          s.blur();
        }
      }
    },
  );
}

/* ================================================================
   GLOBAL: LOGO LIGHTBOX
   ================================================================ */
function initLogoLightbox() {
  const logo =
    document.getElementById(
      "brand-logo",
    );
  const lightbox =
    document.getElementById(
      "logo-jendela",
    );
  const lightboxClose =
    document.getElementById(
      "tutup-logo-jendela",
    );
  if (
    !logo ||
    !lightbox ||
    !lightboxClose
  )
    return;
  const open = () => {
    lightbox.classList.add(
      "terbuka",
    );
    lightbox.setAttribute(
      "aria-hidden",
      "false",
    );
    document.body.style.overflow =
      "hidden";
    lightboxClose?.focus();
  };
  const close = () => {
    lightbox.classList.remove(
      "terbuka",
    );
    lightbox.setAttribute(
      "aria-hidden",
      "true",
    );
    document.body.style.overflow =
      "";
  };
  logo.addEventListener(
    "click",
    open,
  );
  logo.addEventListener(
    "keydown",
    (e) => {
      if (
        e.key === "Enter" ||
        e.key === " "
      ) {
        e.preventDefault();
        open();
      }
    },
  );
  lightboxClose.addEventListener(
    "click",
    close,
  );
  lightbox.addEventListener(
    "click",
    (e) => {
      if (e.target === lightbox)
        close();
    },
  );
  document.addEventListener(
    "keydown",
    (e) => {
      if (
        e.key === "Escape" &&
        lightbox.classList.contains(
          "terbuka",
        )
      )
        close();
    },
  );
}

/* ================================================================
   GLOBAL: FOOTER SOCIAL
   ================================================================ */
function renderFooterSocial() {
  document
    .querySelectorAll(
      ".sosial-kaki",
    )
    .forEach((wadah) => {
      if (
        typeof G === "undefined" ||
        !G.sosmed
      )
        return;
      const platforms = [
        {
          key: "instagram",
          icon: "fa-brands fa-instagram",
          label: "Instagram",
        },
        {
          key: "youtube",
          icon: "fa-brands fa-youtube",
          label: "YouTube",
        },
        {
          key: "tiktok",
          icon: "fa-brands fa-tiktok",
          label: "TikTok",
        },
      ];
      wadah.innerHTML = platforms
        .filter(
          (p) =>
            G.sosmed[p.key] &&
            URLValidator.isSafe(
              G.sosmed[p.key],
            ),
        )
        .map(
          (p) =>
            `<a href="${G.sosmed[p.key]}" target="_blank" rel="noopener noreferrer" aria-label="${p.label} TKJ XI-9"><i class="${p.icon}" aria-hidden="true"></i><span>${p.label}</span></a>`,
        )
        .join("");
    });
}

/* ================================================================
   GLOBAL: TAB BAR ACTIVE
   ================================================================ */
function initTabActive() {
  const page =
    window.location.pathname
      .split("/")
      .pop() || "index.html";
  document
    .querySelectorAll(".tab-item")
    .forEach((tab) => {
      const tabPage = (
        tab.getAttribute("href") ||
        ""
      )
        .split("/")
        .pop();
      if (
        tabPage === page ||
        (page === "" &&
          tabPage === "index.html")
      ) {
        tab.classList.add("aktif");
        tab.setAttribute(
          "aria-current",
          "page",
        );
      }
    });
}

/* ================================================================
   DOM READY — BOOTSTRAP
   ================================================================ */
function inisialisasiUtama() {
  // Core init
  mulaiTombolTemaHeader();
  mulaiTombolKanvasHeader();
  mulaiTombolAudioHeader();
  mulaiMenuHamburger();
  createGlobalClock();

  // Theme
  mulaiTema();
  pasangPendengarTema();

  // Canvas
  tampilkanStatusKanvasJaringan();

  // Audio
  inisialisasiAudio();

  // UI
  initReveal();
  mulaiProgresGulir();
  mulaiKodeRahasia();
  initProgressBar();
  initBackToTop();
  initNetworkStatus();
  initLogoLightbox();
  initTabActive();
  initKeyboardShortcuts();
  renderFooterSocial();

  // Footer year
  document
    .querySelectorAll(
      ".footer-year",
    )
    .forEach(
      (el) =>
        (el.textContent =
          new Date().getFullYear()),
    );

  // Replay intro button
  const replayBtn =
    document.getElementById(
      "replay-intro-tombol",
    );
  if (replayBtn) {
    if (
      sessionStorage.getItem(
        "tkj-intro-done",
      )
    )
      replayBtn.classList.add(
        "terlihat",
      );
    replayBtn.addEventListener(
      "click",
      () => {
        const isInPage =
          window.location.pathname.includes(
            "/halaman/",
          );
        const rootPrefix = isInPage
          ? "../../"
          : "./";
        sessionStorage.removeItem(
          "tkj-intro-done",
        );
        window.location.href =
          rootPrefix +
          "index.html";
      },
    );
  }
}

if (
  document.readyState === "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    inisialisasiUtama,
  );
} else {
  inisialisasiUtama();
}
