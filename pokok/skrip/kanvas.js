/* ================================================================
   pokok/skrip/kanvas.js — TKJ XI-9 | Canvas Particle Network
   ================================================================ */

const KUNCI_PREFERENSI_KANVAS = "tkj-canvas-enabled";
const BATAS_KANVAS = 768;
let pengendaliKanvasJaringan = null;

function mulaiKanvasJaringan() {
  const canvas = document.getElementById("kanvas-jaringan");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let dpr = window.devicePixelRatio || 1;
  let width = 0, height = 0;
  let particles = [];
  let rafId = null;
  let running = true;
  let PARTICLE_COUNT = 0;
  let LINK_DIST = 110;
  let PARTICLE_SIZE = 2.2;
  const SPEED = 0.15;
  let currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';

  function perbaruiKonfigurasi() {
    const isMobile = width <= 640;
    PARTICLE_COUNT = Math.max(10, Math.floor((width * height) / (isMobile ? 12000 : 5000)));
    LINK_DIST = isMobile ? 80 : 120;
    PARTICLE_SIZE = isMobile ? 1.5 : 2.2;
  }

  function ubahUkuran() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = width * dpr; canvas.height = height * dpr;
    canvas.style.width = width + "px"; canvas.style.height = height + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
    perbaruiKonfigurasi();
  }

  function butirAcak() {
    return { x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * SPEED * 2, vy: (Math.random() - 0.5) * SPEED * 2 };
  }

  function mulaiButir() { particles = []; for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(butirAcak()); }

  function drawDarkNetwork() {
    const root = document.documentElement;
    const accent = getComputedStyle(root).getPropertyValue("--accent").trim() || "#ef4444";
    const accent2 = getComputedStyle(root).getPropertyValue("--accent-2").trim() || "#f87171";
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.save(); ctx.globalAlpha = 0.15 * (1 - dist / LINK_DIST);
          ctx.strokeStyle = accent2; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.restore();
        }
      }
    }
    for (const p of particles) {
      ctx.save(); ctx.globalAlpha = 0.6; ctx.fillStyle = accent;
      ctx.beginPath(); ctx.arc(p.x, p.y, PARTICLE_SIZE, 0, 2 * Math.PI); ctx.fill(); ctx.restore();
    }
  }

  function drawBlueLightning() {
    const accent = "#3882f6", accent2 = "#5ea0ff";
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST && Math.random() > 0.92) {
          ctx.save(); ctx.globalAlpha = 0.5 * (1 - dist / LINK_DIST);
          ctx.strokeStyle = Math.random() > 0.5 ? accent : accent2;
          ctx.lineWidth = Math.random() < 0.2 ? 1.5 : 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y);
          ctx.lineTo(a.x + dx * 0.5 + (Math.random() - 0.5) * 15, a.y + dy * 0.5 + (Math.random() - 0.5) * 15);
          ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.restore();
        }
      }
    }
    for (const p of particles) {
      if (Math.random() > 0.95) {
        ctx.save(); ctx.globalAlpha = Math.random() * 0.5 + 0.1; ctx.fillStyle = accent2;
        ctx.beginPath(); ctx.arc(p.x, p.y, PARTICLE_SIZE * 1.5, 0, 2 * Math.PI); ctx.fill(); ctx.restore();
      }
    }
  }

  function drawLightNetwork() {
    const root = document.documentElement;
    const accent = getComputedStyle(root).getPropertyValue("--accent").trim() || "#0d9488";
    const accent2 = getComputedStyle(root).getPropertyValue("--accent-2").trim() || "#14b8a6";
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.save(); ctx.globalAlpha = 0.1 * (1 - dist / LINK_DIST);
          ctx.strokeStyle = accent; ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.restore();
        }
      }
    }
    for (const p of particles) {
      ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = accent2;
      ctx.beginPath(); ctx.arc(p.x, p.y, PARTICLE_SIZE * 0.8, 0, 2 * Math.PI); ctx.fill(); ctx.restore();
    }
  }

  function gambarKanvas() {
    ctx.clearRect(0, 0, width, height);
    if (currentTheme === 'dark') drawDarkNetwork();
    else if (currentTheme === 'blue') drawBlueLightning();
    else if (currentTheme === 'light') drawLightNetwork();
  }

  function update() {
    const speedMult = currentTheme === 'blue' ? 2 : 1;
    for (const p of particles) {
      p.x += p.vx * width * 0.0015 * speedMult; p.y += p.vy * height * 0.0015 * speedMult;
      if (p.x < 0 || p.x > width) p.vx *= -1; if (p.y < 0 || p.y > height) p.vy *= -1;
      p.x = Math.max(0, Math.min(width, p.x)); p.y = Math.max(0, Math.min(height, p.y));
    }
  }

  function jalankan() { if (!running) return; update(); gambarKanvas(); rafId = requestAnimationFrame(jalankan); }
  function henti() {
    running = false; if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("resize", penanganUbahUkuran);
    themeObserver.disconnect();
    ctx.clearRect(0, 0, width, height); canvas.style.display = "none";
  }

  const penanganUbahUkuran = () => { ubahUkuran(); mulaiButir(); };
  ubahUkuran(); mulaiButir(); jalankan();
  window.addEventListener("resize", penanganUbahUkuran);

  const themeObserver = new MutationObserver(() => {
    currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (currentTheme === 'light') ctx.clearRect(0, 0, width, height);
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return { destroy: henti };
}

export function apakahKanvasDiaktifkanSecaraDefault() {
  return window.innerWidth >= BATAS_KANVAS;
}

export function ambilStatusKanvas() {
  const stored = localStorage.getItem(KUNCI_PREFERENSI_KANVAS);
  if (stored === "1" || stored === "true") return true;
  if (stored === "0" || stored === "false") return false;
  return apakahKanvasDiaktifkanSecaraDefault();
}

export function aturStatusKanvas(value) {
  try { localStorage.setItem(KUNCI_PREFERENSI_KANVAS, value ? "1" : "0"); } catch {}
}

export function perbaruiStatusTombolKanvas(tombol, enabled) {
  if (!tombol) return;
  tombol.classList.toggle("aktif", enabled);
  tombol.setAttribute("aria-label", enabled ? "Matikan animasi latar" : "Nyalakan animasi latar");
  const icon = tombol.querySelector("i");
  if (icon) icon.className = enabled ? "fas fa-toggle-on" : "fas fa-toggle-off";
}

export function tampilkanStatusKanvasJaringan() {
  const canvas = document.getElementById("kanvas-jaringan");
  const enabled = ambilStatusKanvas();
  const tombol = document.getElementById("tombol-kanvas");
  perbaruiStatusTombolKanvas(tombol, enabled);
  if (!canvas) return;
  if (enabled) {
    if (!pengendaliKanvasJaringan) {
      canvas.style.display = "";
      pengendaliKanvasJaringan = mulaiKanvasJaringan();
    }
  } else {
    if (pengendaliKanvasJaringan) { pengendaliKanvasJaringan.destroy(); pengendaliKanvasJaringan = null; }
    canvas.style.display = "none";
  }
}
