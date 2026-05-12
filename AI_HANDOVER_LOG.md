# 🛠️ AI Technical Handover & System Specification
**Project:** TKJ XI-9 Portfolio Website (Refactor v2.0)
**Date:** 10 May 2026
**Architectural Pattern:** Modular Vanilla ESM (Zero Abstraction)

---

## 🏗️ 1. CORE ARCHITECTURE & FILE SYSTEM

Proyek ini telah dimigrasikan dari sistem monolitik ke **Modular Platform-Native**. Semua skrip harus menggunakan `type="module"`.

### A. Modular Scripts (`/pokok/skrip/`)
- **`pengaturan.js` (State Manager)**: 
  - Mengekspor objek `G`. Ini adalah *Central State*.
  - Berisi data profil, daftar siswa (`namaSiswa`), statistik (`stats`), dan konfigurasi bagan organisasi (`strukturOrg`).
- **`alat.js` (Service Layer)**:
  - `URLValidator`: Keamanan untuk sanitasi URL gambar/link.
  - `renderAvatar(member, size)`: Menghasilkan HTML avatar dengan fallback inisial jika foto gagal dimuat.
  - `RevealObserver`: Menggunakan `IntersectionObserver` untuk mentrigger class `.on` pada elemen `.reveal`.
  - `enableFocusTrap / disableFocusTrap`: Manajemen aksesibilitas untuk modal/lightbox.
- **`utama.js` (Global Orchestrator)**:
  - Mengatur elemen yang ada di semua halaman (Header actions, Hamburger, Jam, Audio, Progress Bar).

### B. CSS Architecture (`/pokok/gaya/` & `/elemen/gaya/`)
- **`dasar.css`**: Berisi *Design Tokens* (Colors, Spacing, Typography).
- **`animasi.css`**: Global keyframes (`slide-in`, `fade-up`, `snakeBorderSlide`).
- **`tata-letak.css`**: Global layout (Bilah atas, jejak navigasi, grid dasar).
- **Elemen Folder**: Modular CSS per komponen (Tombol, Kartu, Modal, Formulir).

---

## 📊 2. DATA SCHEMA (G OBJECT)

Asisten AI harus merujuk ke skema ini saat memodifikasi konten:
- **`G.namaSiswa`**: Array of objects `{ nama, nis, foto, desc, social, audio }`.
- **`G.strukturOrg`**: Array of objects `{ nama, jabatan, foto }`. Urutan dalam array menentukan urutan dalam bagan (Ketua -> Wakil -> dst).
- **`G.tkj`**: Objek berisi `deskripsi`, `mapel`, `kurikulum`, dan `karir`.

---

## 🎨 3. RECENT TECHNICAL IMPLEMENTATIONS (LOG)

### 🧩 Structure Page (`/halaman/struktur/`)
- **Dynamic Logic**: Menggunakan `buildOrgRow()` untuk membuat container baris dan `connector()` untuk garis vertikal.
- **Snake Border**: Menggunakan `linear-gradient` ganda dengan `background-origin: border-box` dan animasi `background-position`.
  - *Keyframe*: `snakeBorderSlide` (10s linear infinite).
- **Hierarchy**: Wali Kelas (Level 0) -> Ketua/Wakil (Level 1) -> Sekretaris (Level 2) -> Bendahara (Level 3).

### 💻 Developer Page (`/halaman/pengembang/`)
- **Tab System**: Menggunakan `data-tab` pada tombol dan `id` (content) pada panel. 
- **Transition**: Setiap pergantian tab memicu animasi `slide-in` dan mereset scroll panel.
- **Logic**: Skrip memastikan hanya satu panel aktif dengan `classList.toggle('aktif')`.

### 🌐 TKJ Page (`/halaman/tkj/`)
- **Subnet Calc**: Menggunakan manipulasi bitwise (`>>> 0`, `<< 8`) untuk konversi IP ke Integer dan sebaliknya.
- **Ping Sim**: Simulasi asinkron menggunakan `setInterval` untuk animasi dot dan `setTimeout` untuk hasil random (success rate 85%).

---

## ⚠️ 4. MANDATORY TECHNICAL RULES (WAJIB)

1. **Pathing**: Saat berada di sub-direktori `/halaman/[nama]/`, import harus menggunakan path relatif `../../pokok/skrip/...`.
2. **DOM Readiness**: Gunakan `document.addEventListener("DOMContentLoaded", ...)` atau pastikan script berada di akhir body dengan `type="module"`.
3. **Clean HTML**: Hapus semua konten *hardcoded* di dalam container target sebelum perenderan JS (`container.innerHTML = ""`).
4. **Consistency**: Jangan membuat variabel warna baru. Gunakan `var(--accent)`, `var(--surface)`, `var(--bg-1)`.
5. **A11y**: Setiap elemen interaktif (kartu, avatar yang bisa diklik) wajib memiliki `role="button"` dan `tabindex="0"`.

---

## 🗺️ 5. DETAILED ROADMAP (NEXT)

### Phase 1: Member Page (`/halaman/anggota/`)
- **Requirement**: Implementasi Slider Horizontal dan Grid Anggota.
- **Logic**: Search filter harus real-time (input event) dengan `requestAnimationFrame` untuk performa.
- **Feature**: Modal Detail Anggota + WhatsApp Audio Player style.

### Phase 2: Gallery Page (`/halaman/galeri/`)
- **Requirement**: Masonry Grid.
- **Logic**: Gunakan `loading="lazy"` dan skeleton loading placeholder sebelum gambar `decode()`.
- **Feature**: 3D Stack Carousel (initStackCarousel) untuk highlight foto pilihan.

### Phase 3: Skills Page (`/halaman/keahlian/`)
- **Requirement**: Interactive Skill Bars.
- **Logic**: `animateCounter` untuk persentase dan `width` transition pada `.bar-fill`.

---
**Handover Note:** Proyek ini mengutamakan kecepatan render dan efisiensi memori. Hindari penggunaan library eksternal jika API Web Native (IntersectionObserver, Bitwise, Proxy) bisa menyelesaikannya.
