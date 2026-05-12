/* ================================================================
   halaman/pengembang/skrip.js — TKJ XI-9 | Developer Page Logic
   ================================================================ */

import {
  initReveal,
  animateCounter,
  makeInitials
} from "../../pokok/skrip/alat.js";
import { G } from "../../pokok/skrip/pengaturan.js";

/**
 * Inisialisasi Utama Halaman Pengembang
 */
function inisialisasiPengembang() {
  // 1. Sinkronisasi Data dari G (pengaturan.js)
  const descEl = document.getElementById("kelas-desc");
  if (descEl && G) {
    descEl.textContent = G.pageDescription || G.deskripsi || "Perjalanan Developer TKJ XI-9.";
  }

  // Cari data alfredo di struktur organisasi atau fallback ke masdo
  const alfredo = (G.strukturOrg || []).find(m => m.nama && m.nama.includes("Alfredo")) || 
                  G.masdo || 
                  { nama: "Alfredo Pratama", jabatan: "Wakil Ketua" };

  const nameEl = document.querySelector(".wali-name");
  const posEl = document.querySelector(".wali-pos");
  const initEl = document.getElementById("avatar-initials");

  if (nameEl) nameEl.textContent = alfredo.nama;
  if (posEl) posEl.textContent = alfredo.jabatan;
  if (initEl) initEl.textContent = makeInitials(alfredo.nama);

  // 2. Aktifkan Fitur-Fitur
  initDeveloperTabs();
  initTimelineAnimation();
  initStatsAnimation();
  initSkillBars();
  setupPhotoLightbox();

  // 3. Jalankan Reveal untuk elemen awal
  if (typeof initReveal === "function") initReveal();
}

/**
 * Logika Navigasi Tab dengan Transisi Halus
 */
function initDeveloperTabs() {
  const tabs = document.querySelectorAll(".dev-tab");
  const contents = document.querySelectorAll(".dev-content-item");

  if (!tabs.length || !contents.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-tab");
      if (!targetId || tab.classList.contains("active")) return;

      // 1. Update state tombol tab
      tabs.forEach(t => {
        const isActive = t === tab;
        t.classList.toggle("active", isActive);
        t.setAttribute("aria-selected", isActive ? "true" : "false");
        t.setAttribute("tabindex", isActive ? "0" : "-1");
      });

      // 2. Update visibilitas konten dengan animasi
      contents.forEach(content => {
        const isTarget = content.getAttribute("data-content") === targetId;
        
        if (isTarget) {
          content.classList.add("active");
          content.setAttribute("aria-hidden", "false");
        } else {
          content.classList.remove("active");
          content.setAttribute("aria-hidden", "true");
        }
      });

      // 3. Scroll halus ke konten di mobile
      if (window.innerWidth < 768) {
        const container = document.querySelector(".developer-tabs");
        if (container) {
          window.scrollTo({
            top: container.offsetTop - 70,
            behavior: "smooth"
          });
        }
      }
    });

    // Support navigasi keyboard
    tab.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        tab.click();
      }
    });
  });
}

/**
 * Animasi Timeline Staggered dengan Intersection Observer
 */
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  if (!timelineItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll(".timeline-item:not(.visible)");
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("visible");
          }, index * 180); // Stagger delay
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  const timelineContainer = document.getElementById("dev-timeline");
  if (timelineContainer) observer.observe(timelineContainer);
}

/**
 * Animasi Angka Statistik saat Terlihat
 */
function initStatsAnimation() {
  const statsGrid = document.querySelector(".stats-grid");
  if (!statsGrid) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".stat-number[data-target]").forEach(num => {
          const targetVal = parseInt(num.getAttribute("data-target"));
          if (!isNaN(targetVal) && typeof animateCounter === "function") {
            animateCounter(num, targetVal, 2000);
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(statsGrid);
}

/**
 * Animasi Skill Bars
 */
function initSkillBars() {
  const skillSection = document.querySelector(".skill-bars-section");
  if (!skillSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-bar-fill").forEach(bar => {
          const pct = bar.getAttribute("data-pct") || "0";
          bar.style.width = pct + "%";
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillSection);
}

/**
 * Photo Lightbox (Premium Implementation)
 */
function setupPhotoLightbox() {
  const lightbox = document.getElementById("photo-lightbox");
  const lightboxImg = document.getElementById("photo-lightbox-img");
  const closeBtn = document.getElementById("photo-lightbox-close");
  const photos = document.querySelectorAll(".article-photo img");

  if (!lightbox || !lightboxImg || !closeBtn || !photos.length) return;

  const openLightbox = (img) => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  photos.forEach(img => {
    img.addEventListener("click", () => openLightbox(img));
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

// Bootstrapping
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inisialisasiPengembang);
} else {
  inisialisasiPengembang();
}
}
