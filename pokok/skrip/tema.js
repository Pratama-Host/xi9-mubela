/* ================================================================
   pokok/skrip/tema.js — TKJ XI-9 | Theme Management
   ================================================================ */

const validThemes = ["light", "dark", "blue"];
const defaultTheme = "light";
let themeListenerAttached = false;

function ambilTombolTema() { return document.getElementById("tombol-tema"); }

export function perbaruiIkonTombol(t) {
  const tombol = ambilTombolTema();
  if (!tombol) return;
  const icon = tombol.querySelector("i");
  if (icon) {
    if (t === "dark") icon.className = "fas fa-sun";
    else if (t === "light") icon.className = "fas fa-moon";
    else icon.className = "fas fa-palette";
  }
  tombol.setAttribute("aria-label", t === "dark" ? "Aktifkan mode terang" : t === "light" ? "Aktifkan mode biru" : "Aktifkan mode gelap");
}

export function terapkanTema(t) {
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  localStorage.setItem("tkj-theme", t);
  perbaruiIkonTombol(t);
  const tombol = ambilTombolTema();
  if (!tombol) return;
  tombol.setAttribute("data-switching", "true");
  document.body.classList.add("theme-switching");
  setTimeout(() => { tombol.removeAttribute("data-switching"); document.body.classList.remove("theme-switching"); }, 600);
}

export function pasangPendengarTema() {
  if (themeListenerAttached) return;
  const tombol = ambilTombolTema();
  if (!tombol) return;
  tombol.addEventListener("click", (e) => {
    e.stopPropagation();
    const root = document.documentElement;
    const current = root.getAttribute("data-theme") || defaultTheme;
    const idx = validThemes.indexOf(current);
    terapkanTema(validThemes[(idx + 1) % validThemes.length]);
  });
  themeListenerAttached = true;
  const root = document.documentElement;
  perbaruiIkonTombol(root.getAttribute("data-theme") || defaultTheme);
}

export function mulaiTema() {
  const root = document.documentElement;
  let saved = localStorage.getItem("tkj-theme");
  if (!validThemes.includes(saved)) { saved = defaultTheme; localStorage.setItem("tkj-theme", defaultTheme); }
  terapkanTema(saved);
  
  const buttonObserver = new MutationObserver(() => {
    if (!themeListenerAttached && ambilTombolTema()) {
      pasangPendengarTema();
      buttonObserver.disconnect();
    }
  });
  buttonObserver.observe(document.documentElement, { childList: true, subtree: true });
  return { pasangPendengarTema };
}
