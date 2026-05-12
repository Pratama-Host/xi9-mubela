/* ================================================================
   pokok/skrip/audio.js — TKJ XI-9 | Background Audio Player
   ================================================================ */

const AUDIO_PREF_KEY = "tkj-audio-enabled";

export function ambilStatusAudio() {
  const stored = localStorage.getItem(AUDIO_PREF_KEY);
  if (stored === "1" || stored === "true") return true;
  if (stored === "0" || stored === "false") return false;
  return false;
}

export function aturStatusAudio(value) {
  try { localStorage.setItem(AUDIO_PREF_KEY, value ? "1" : "0"); } catch {}
}

export function perbaruiStatusTombolAudio(tombol, enabled) {
  if (!tombol) return;
  tombol.classList.toggle("aktif", enabled);
  tombol.setAttribute("aria-label", enabled ? "Matikan musik latar" : "Nyalakan musik latar");
  const wrapper = tombol.querySelector(".pembungkus-ikon-audio");
  if (wrapper) wrapper.innerHTML = `<i class="fas fa-volume-${enabled ? "up" : "mute"}" aria-hidden="true"></i>`;
}

export function kirimPesanAudio(payload) {
  const audioFrame = document.getElementById("bingkai-audio");
  if (!audioFrame || !audioFrame.contentWindow) return;
  audioFrame.contentWindow.postMessage(payload, "*");
}

export function mintaStatusAudio() { kirimPesanAudio({ action: "getState" }); }

export function tanganiPesanBingkaiAudio(messageEvent) {
  if (!messageEvent.data || typeof messageEvent.data !== "object") return;
  const audioFrame = document.getElementById("bingkai-audio");
  if (!audioFrame || messageEvent.source !== audioFrame.contentWindow) return;
  const { event: audioEvent, sedangBermain, volume } = messageEvent.data;
  if (["play", "pause", "state", "error"].includes(audioEvent)) {
    const tombol = document.getElementById("tombol-audio");
    let enabled;
    if (audioEvent === "error") { enabled = ambilStatusAudio(); }
    else { enabled = sedangBermain === true; aturStatusAudio(enabled); }
    perbaruiStatusTombolAudio(tombol, enabled);
  }
  if (typeof volume === "number") {
    try { localStorage.setItem("tkj-audio-volume", String(volume)); } catch {}
  }
}

export function tampilkanStatusAudio() {
  const enabled = ambilStatusAudio();
  const tombol = document.getElementById("tombol-audio");
  perbaruiStatusTombolAudio(tombol, enabled);
  kirimPesanAudio({ action: enabled ? "play" : "pause" });
}

export function inisialisasiAudio() {
  document.hasUserInteracted = false;
  const enableAudioOnInteraction = () => {
    document.hasUserInteracted = true;
    document.removeEventListener("click", enableAudioOnInteraction);
    document.removeEventListener("keydown", enableAudioOnInteraction);
    document.removeEventListener("touchstart", enableAudioOnInteraction);
    if (ambilStatusAudio()) tampilkanStatusAudio();
  };
  document.addEventListener("click", enableAudioOnInteraction);
  document.addEventListener("keydown", enableAudioOnInteraction);
  document.addEventListener("touchstart", enableAudioOnInteraction);

  const audioFrame = document.getElementById("bingkai-audio");
  if (audioFrame) {
    audioFrame.addEventListener("load", () => { tampilkanStatusAudio(); mintaStatusAudio(); });
    if (audioFrame.contentWindow) { tampilkanStatusAudio(); mintaStatusAudio(); }
  }
  window.addEventListener("message", tanganiPesanBingkaiAudio);
}
