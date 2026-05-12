/* pokok/skrip/pengaturan.js — TKJ XI-9 | Data Konfigurasi Global */
// Konversi dari settings.js ke ES Module

// ================================================================
//  settings.js — TKJ XI-9 | Data Global & Konfigurasi
//  Edit file ini untuk mengubah data tanpa menyentuh file lain.
//  Versi 2.0 · Renovasi 2026
// ================================================================
"use strict";

const _root = window.location.pathname.includes("/halaman/") ? "../../" : "./";

const G = {
  // ── INFO KELAS ──────────────────────────────────────────────
  namaKelas: "XI-9",
  jurusan: "Teknik Komputer dan Jaringan",
  namaSekolah: "SMK Muhammadiyah Belitang",
  tahunAjaran: "2026 / 2027",
  motto: "Solid, Kreatif, dan Berdedikasi Tanpa Batas",
  deskripsi: "Kelas Teknik Komputer dan Jaringan yang penuh semangat belajar, inovasi tanpa henti, dan solidaritas yang tak tergoyahkan dalam menguasai dunia teknologi digital.",
  sloganHero: "Komunitas pejuang digital yang siap menguasai jaringan, keamanan siber, dan teknologi masa depan dengan semangat, solidaritas, dan kompetensi nyata.",
  ogImage: "https://picsum.photos/seed/tkj-xi9-og/1200/630",
  baseUrl: "./",
  rootPrefix: _root,

  // ── COUNTDOWN ───────────────────────────────────────────────
  // Target: Ujian Akhir Semester Genap 2026/2027 (otomatis "lewat" → tampil pesan)
  countdown: {
    label: "Ujian Akhir Semester",
    target: "2026-06-10T08:00:00",
  },

  // ── SOSIAL MEDIA ────────────────────────────────────────────
  sosmed: {
    instagram:
      "https://instagram.com/tkj.xi9.smkn1",
    youtube:
      "https://youtube.com/@tkjxi9smkn1",
    tiktok:
      "https://www.tiktok.com/@tkjxi9smkn1",
  },

  // ── STATISTIK ───────────────────────────────────────────────
  stats: [
    {
      icon: "fa-users",
      angka: 20,
      suffix: "",
      label: "Anggota",
    },
    {
      icon: "fa-trophy",
      angka: 15,
      suffix: "",
      label: "Prestasi",
    },
    {
      icon: "fa-calendar",
      angka: 2,
      suffix: "",
      label: "Tahun Bersama",
    },
    {
      icon: "fa-star",
      angka: 100,
      suffix: "%",
      label: "Semangat Belajar",
    },
  ],

  // ── PRESTASI ────────────────────────────────────────────────
  prestasi: [
    {
      judul:
        "Juara 1 Mencintai Namun Tak Berani Mengungkapkan",
      tahun: "2024",
      tingkat: "Internasional",
    },
    {
      judul:
        "Juara 2 Menunggu Balasan Chat yang Ternyata Cuma Typo",
      tahun: "2024",
      tingkat: "Provinsi",
    },
    {
      judul:
        "Finalis Bertahan di Friendzone demi Lihat Dia Senyum",
      tahun: "2024",
      tingkat: "Nasional",
    },
    {
      judul:
        "Juara 1 Spesialis Memendam Rasa Pas Liat Dia Sama yang Lain",
      tahun: "2024",
      tingkat: "Sekolah",
    },
    {
      judul:
        "Sertifikasi Sabar Menghadapi Sikap Dingin Si Pipi Lucu",
      tahun: "2023",
      tingkat: "Nasional",
    },
  ],

  // ── VISI & MISI ─────────────────────────────────────────────
  visi: "Menjadi kelas unggulan yang melahirkan generasi teknisi yang handal benerin koneksi internet, tapi tetap sabar menghadapi koneksi perasaan yang sering 'Request Time Out' dari si dia.",
  misi: [
    "Meningkatkan kompetensi dalam meng-unblock WhatsApp doi dan menjaga keamanan siber hati agar tidak mudah kena hack janji manis",
    "Membangun karakter siswa yang jujur mengakui kalau dia cuma anggep teman, dan disiplin menghapus history chat yang bikin gagal move on",
    "Mendorong budaya inovasi mencari alasan buat chat duluan dan problem solving saat chat cuma dibalas 'O' atau 'Woke'",
    "Memperkuat solidaritas sesama pejuang friendzone dan semangat gotong royong meminjamkan bahu saat teman kena ghosting",
    "Mempersiapkan diri secara optimal untuk masa depan yang cerah sebagai Senior Programmer, biar nanti si dia menyesal telah berpaling",
  ],

  // ── WALI KELAS ──────────────────────────────────────────────
  waliKelas: {
    nama: "Bu Dina Sa'diyah",
    jabatan: "Wali Kelas XI-9 TKJ",
    foto: "https://ui-avatars.com/api/?name=Dina+Sa'diyah&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
  },

  // ── MASDO OFFICIALS ──────────────────────────────────────────
  masdo: {
    nama: "Masdo Officials",
    jabatan: "Sudah Jadi Legenda",
    keahlian: [
      "Web Development",
      "Network Administration",
      "Digital Marketing",
      "Content Creation",
    ],
    foto: _root + "assets/profil/profil-alfredo.webp",
  },

  // ── TIM PENGAJAR ─────────────────────────────────────────────
  guru: [
    {
      nama: "Mr. Sudarto",
      mapel: "TLJ & ASJ",
      peran:
        "System & Service Orchestrator",
      quote:
        "Sistem yang baik bukan yang tidak pernah down, tapi yang selalu tahu cara bangkit.",
      expertise: [
        {
          label:
            "Teknologi Layanan Jaringan",
          level: 90,
        },
        {
          label:
            "Administrasi Sistem Jaringan",
          level: 88,
        },
        {
          label:
            "Network Protocol",
          level: 85,
        },
      ],
    },
    {
      nama: "Mr. Doni Suwito",
      mapel: "Teknologi WAN",
      peran:
        "Global Connectivity Strategist",
      quote:
        "Jarak hanya angka. Dengan arsitektur yang benar, semua titik bisa terhubung.",
      expertise: [
        {
          label:
            "Wide Area Network",
          level: 92,
        },
        {
          label:
            "Network Architecture",
          level: 87,
        },
        {
          label:
            "Data Transmission",
          level: 83,
        },
      ],
    },
    {
      nama: "Mr. Crisna",
      mapel: "Pemrograman Web",
      peran:
        "Full-Stack Architect",
      quote:
        "Kode yang baik bukan yang bisa dibaca mesin, tapi yang bisa dibaca manusia.",
      expertise: [
        {
          label:
            "Frontend Development",
          level: 91,
        },
        {
          label: "Backend & Logic",
          level: 86,
        },
        {
          label:
            "UX & Responsivitas",
          level: 88,
        },
      ],
    },
    {
      nama: "Mr. Hendri",
      mapel:
        "AIJ & Dasar Desain Grafis",
      peran:
        "Infrastructure & Visual Lead",
      quote:
        "Infrastruktur kuat tanpa desain yang baik seperti server canggih tanpa antarmuka.",
      expertise: [
        {
          label:
            "Administrasi Infrastruktur",
          level: 89,
        },
        {
          label: "Desain Grafis",
          level: 82,
        },
        {
          label:
            "Visual Communication",
          level: 80,
        },
      ],
    },
    {
      nama: "Mr. Deny",
      mapel:
        "Percetakan Digital & Desain",
      peran:
        "Creative Output Specialist",
      quote:
        "Ide tanpa eksekusi hanya mimpi. Desain yang presisi adalah jembatannya.",
      expertise: [
        {
          label:
            "Digital Printing",
          level: 93,
        },
        {
          label:
            "Design Precision",
          level: 90,
        },
        {
          label:
            "Industry Standard",
          level: 87,
        },
      ],
    },
  ],

  // ── STRUKTUR ORGANISASI ─────────────────────────────────────
  // Urutan: 0-1=Ketua+Wakil, 2-3=Sekretaris I/II, 4-5=Bendahara I/II, 6-7=Keamanan I/II
  strukturOrg: [
    {
      nama: "Alif Harum Aji Pamungkas",
      jabatan: "Ketua Kelas",
      foto: _root + "assets/profil/alip.webp",
    },
    {
      nama: "Alfredo Pratama",
      jabatan: "Wakil Ketua",
      foto: _root + "assets/profil/profil-alfredo.webp",
    },
    {
      nama: "Anggi Olivia Safitri",
      jabatan: "Sekretaris I",
      foto: "https://ui-avatars.com/api/?name=Anggi+Olivia&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
    },
    {
      nama: "Aulia Rahmadani",
      jabatan: "Sekretaris II",
      foto: "https://ui-avatars.com/api/?name=Aulia+Rahmadani&background=b91c1c&color=fff&size=200&bold=true&font-size=0.33",
    },
    {
      nama: "Ahmad Andrean Pratama",
      jabatan: "Bendahara I",
      foto: "https://ui-avatars.com/api/?name=Ahmad+Andrean&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
    },
    {
      nama: "Bela Ameliya",
      jabatan: "Bendahara II",
      foto: "https://ui-avatars.com/api/?name=Bela+Ameliya&background=b91c1c&color=fff&size=200&bold=true&font-size=0.33",
    },
    {
      nama: "Alentian Vidyanata",
      jabatan: "Keamanan I",
      foto: "https://ui-avatars.com/api/?name=Alentian+Vidyanata&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
    },
    {
      nama: "Anka Juan Lianri",
      jabatan: "Keamanan II",
      foto: "https://ui-avatars.com/api/?name=Anka+Juan+Lianri&background=b91c1c&color=fff&size=200&bold=true&font-size=0.33",
    },
  ],

  // ── DATA ANGGOTA (20 siswa) ─────────────────────────────────
  namaSiswa: [
    {
      nama: "Ahmad Andrean Pratama",
      nis: "5958",
      foto: "https://ui-avatars.com/api/?name=Ahmad+Andrean&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Ahmad Andrean Pratama",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Ahmad+Andrean&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Alentian Vidyanata",
      nis: "5961",
      foto: "https://ui-avatars.com/api/?name=Alentian+Vidyanata&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Alentian Vidyanata",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Alentian+Vidyanata&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Alfredo Pratama",
      nis: "5962",
      foto: _root + "assets/profil/profil-alfredo.webp",
      desc: "Siswa XI TKJ",
      audio:
        _root + "assets/audio/videoplayback.weba",
      namaAudio: "Alfredo Pratama",
      fotoAudio:
        _root + "assets/profil/profil-alfredo.webp",
      descAudio:
        "ggdjsdjs dhks fgskd gsdfsfsdf ssf dsiegufwiegf ws dsgidgs dfsdgfis sdgfsidfgi sudgfsi sf sifi sdfis gdisgrieriw w",
      social: { instagram: "#" },
    },
    {
      nama: "Alif Harum Aji Pamungkas",
      nis: "5963",
      foto: _root + "assets/profil/alip.webp",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Alif Harum Aji Pamungkas",
      fotoAudio:
        _root + "assets/profil/alip.webp",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Alvina Ekawibawani",
      nis: "5964",
      foto: _root + "assets/profil/profil-alvina.webp",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Alvina Ekawibawani",
      fotoAudio:
        _root + "assets/profil/profil-alvina.webp",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Anggi Olivia Safitri",
      nis: "5965",
      foto: "https://ui-avatars.com/api/?name=Anggi+Olivia&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Anggi Olivia Safitri",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Anggi+Olivia&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Anggraini Nurul Amalia",
      nis: "5966",
      foto: "https://ui-avatars.com/api/?name=Anggraini+Nurul&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Anggraini Nurul Amalia",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Anggraini+Nurul&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Anggun Febrita Lustia",
      nis: "5967",
      foto: "https://ui-avatars.com/api/?name=Anggun+Febrita&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Anggun Febrita Lustia",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Anggun+Febrita&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Anka Juan Lianri",
      nis: "5969",
      foto: "https://ui-avatars.com/api/?name=Anka+Juan&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Anka Juan Lianri",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Anka+Juan&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Annisa Zahrani",
      nis: "5970",
      foto: "https://ui-avatars.com/api/?name=Annisa+Zahrani&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio: "Annisa Zahrani",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Annisa+Zahrani&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Aprilia Kartika Sari",
      nis: "5971",
      foto: "https://ui-avatars.com/api/?name=Aprilia+Kartika&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Aprilia Kartika Sari",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Aprilia+Kartika&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Apritha Arumdani",
      nis: "5972",
      foto: "https://ui-avatars.com/api/?name=Apritha+Arumdani&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Apritha Arumdani",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Apritha+Arumdani&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Asyifa Elfrida",
      nis: "5973",
      foto: _root + "assets/profil/cute.webp",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio: "Asyifa Elfrida",
      fotoAudio:
        _root + "assets/profil/cute.webp",
      descAudio: "Siswa XI TKJ",
      social: {
        instagram:
          "https://www.instagram.com/el___faa",
      },
    },
    {
      nama: "Aulia Abel Pratiwi",
      nis: "5974",
      foto: "https://ui-avatars.com/api/?name=Aulia+Abel&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Aulia Abel Pratiwi",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Aulia+Abel&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Aulia Rahmadani",
      nis: "5975",
      foto: "https://ui-avatars.com/api/?name=Aulia+Rahmadani&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio: "Aulia Rahmadani",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Aulia+Rahmadani&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Ayshyva Sandrella",
      nis: "5976",
      foto: "https://ui-avatars.com/api/?name=Ayshyva+Sandrella&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Ayshyva Sandrella",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Ayshyva+Sandrella&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Bela Ameliya",
      nis: "5978",
      foto: "https://ui-avatars.com/api/?name=Bela+Ameliya&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio: "Bela Ameliya",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Bela+Ameliya&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Belva Fedida Eka Callola",
      nis: "5979",
      foto: "https://ui-avatars.com/api/?name=Belva+Fedida&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Belva Fedida Eka Callola",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Belva+Fedida&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Bilkis Keisa Duwi Pandriya",
      nis: "5980",
      foto: "https://ui-avatars.com/api/?name=Bilkis+Keisa&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Bilkis Keisa Duwi Pandriya",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Bilkis+Keisa&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
    {
      nama: "Chika Mutia Astri",
      nis: "5981",
      foto: "https://ui-avatars.com/api/?name=Chika+Mutia&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      desc: "Siswa XI TKJ",
      audio: null,
      namaAudio:
        "Chika Mutia Astri",
      fotoAudio:
        "https://ui-avatars.com/api/?name=Chika+Mutia&background=7f1d1d&color=fff&size=200&bold=true&font-size=0.33",
      descAudio: "Siswa XI TKJ",
      social: { instagram: "#" },
    },
  ],

  // ── SKILLS / KOMPETENSI ─────────────────────────────────────
  skills: [
    {
      nama: "Kabel Pulling Simulator",
      level: 90,
      icon: "fa-solid fa-code-fork",
      desc: "Expert crimping kabel UTP sambil ngobrol. Pernah bikin topologi jaringan yang cuma Tuhan dan aku yang paham. Sekarang cuma Tuhan.",
    },
    {
      nama: "Professional Googler",
      level: 80,
      icon: "fa-brands fa-meta",
      desc: "Stack Overflow adalah dokumentasi resmi. 'View Page Source' adalah cheat code kehidupan. Ctrl+C Ctrl+V with extra steps.",
    },
    {
      nama: "Dukun PC Bermasalah",
      level: 88,
      icon: "fa-solid fa-computer",
      desc: "Komputer mati? Coba restart. Masih mati? Ketok pelan-pelan. Berhasil? Ilmu warisan nenek moyang ini mah.",
    },
    {
      nama: "Script Kiddie Wannabe",
      level: 75,
      icon: "fa-solid fa-repeat",
      desc: "Download tools hacking dari YouTube. Belum tau cara pake. Password sendiri sering lupa. Ironis memang.",
    },
    {
      nama: "Terminal Cosplayer",
      level: 78,
      icon: "fa-solid fa-terminal",
      desc: "Buka terminal biar keliatan pro. Ketik 'ls' sama 'cd' doang. Temen kagum. Mission accomplished.",
    },
    {
      nama: "Error Message Collector",
      level: 82,
      icon: "fa-solid fa-triangle-exclamation",
      desc: "Koleksi error message lebih banyak dari line of code. 'It works on my machine' adalah filosofi hidup.",
    },
  ],

  galeri: [
    {
      src: _root + "assets/kenangan/foto-kelas1.webp",
      caption:
        "Ahmad Andrean Pratama",
      label:
        "Ahmad Andrean Pratama",
    },
    {
      src: _root + "assets/kenangan/foto-kelas2.webp",
      caption:
        "Alentian Vidyanata",
      label: "Alentian Vidyanata",
    },
    {
      src: _root + "assets/kenangan/foto-lab1.webp",
      caption: "Alfredo Pratama",
      label: "Alfredo Pratama",
    },
    {
      src: _root + "assets/kenangan/foto-kelas3.webp",
      caption:
        "Alif Harum Aji Pamungkas",
      label:
        "Alif Harum Aji Pamungkas",
    },
    {
      src: _root + "assets/kenangan/foto-cewe1.webp",
      caption:
        "Alvina Ekawibawani",
      label: "Alvina Ekawibawani",
    },
    {
      src: _root + "assets/kenangan/foto-cewe2.webp",
      caption:
        "Anggi Olivia Safitri",
      label:
        "Anggi Olivia Safitri",
    },
    {
      src: _root + "assets/kenangan/kenangan1.webp",
      caption:
        "Anggraini Nurul Amalia",
      label:
        "Anggraini Nurul Amalia",
    },
    {
      src: _root + "assets/kenangan/kenangan2.webp",
      caption:
        "Anggun Febrita Lustia",
      label:
        "Anggun Febrita Lustia",
    },
    {
      src: _root + "assets/kenangan/meme.png",
      caption: "Anka Juan Lianri",
      label: "Anka Juan Lianri",
    },
    {
      src: _root + "assets/kenangan/kenangan4.webp",
      caption: "Annisa Zahrani",
      label: "Annisa Zahrani",
    },
    {
      src: _root + "assets/kenangan/kenangan5.webp",
      caption:
        "Aprilia Kartika Sari",
      label:
        "Aprilia Kartika Sari",
    },
    {
      src: _root + "assets/kenangan/kenangan6.webp",
      caption: "Apritha Arumdani",
      label: "Apritha Arumdani",
    },
    {
      src: _root + "assets/kenangan/kenangan7.webp",
      caption: "Asyifa Elfrida",
      label: "Asyifa Elfrida",
    },
    {
      src: _root + "assets/kenangan/kenangan8.webp",
      caption:
        "Aulia Abel Pratiwi",
      label: "Aulia Abel Pratiwi",
    },
    {
      src: _root + "assets/kenangan/kenangan9.webp",
      caption: "Aulia Rahmadani",
      label: "Aulia Rahmadani",
    },
    {
      src: _root + "assets/kenangan/kenangan10.webp",
      caption: "Ayshyva Sandrella",
      label: "Ayshyva Sandrella",
    },
    {
      src: _root + "assets/kenangan/kenangan11.webp",
      caption: "Bela Ameliya",
      label: "Bela Ameliya",
    },
    {
      src: _root + "assets/kenangan/kenangan12.webp",
      caption:
        "Belva Fedida Eka Callola",
      label:
        "Belva Fedida Eka Callola",
    },
    {
      src: _root + "assets/kenangan/kenangan13.webp",
      caption:
        "Bilkis Keisa Duwi Pandriya",
      label:
        "Bilkis Keisa Duwi Pandriya",
    },
    {
      src: _root + "assets/kenangan/meme2.jpeg",
      caption: "Chika Mutia Astri",
      label: "Chika Mutia Astri",
    },
  ],

  // ── DATA TKJ (Halaman tkj.html) ────────────────────────────
  tkj: {
    deskripsi:
      "Teknik Komputer dan Jaringan (TKJ) adalah program keahlian yang mempelajari instalasi, konfigurasi, pemeliharaan sistem komputer, serta perancangan dan pengelolaan jaringan komunikasi data dari skala lokal hingga enterprise.",
    mapel: [
      {
        nama: "Dasar Jaringan Komputer",
        icon: "fa-network-wired",
      },
      {
        nama: "Administrasi Server",
        icon: "fa-server",
      },
      {
        nama: "Keamanan Jaringan",
        icon: "fa-shield-halved",
      },
      {
        nama: "Pemrograman Web",
        icon: "fa-code",
      },
      {
        nama: "Sistem Operasi Jaringan",
        icon: "fa-desktop",
      },
      {
        nama: "Perakitan Komputer",
        icon: "fa-microchip",
      },
      {
        nama: "Komunikasi Data & Fiber",
        icon: "fa-wifi",
      },
      {
        nama: "Cloud Computing Dasar",
        icon: "fa-cloud",
      },
    ],
    karir: [
      {
        jabatan:
          "Network Engineer",
        icon: "fa-network-wired",
        desc: "Merancang, mengimplementasikan, dan mengelola infrastruktur jaringan perusahaan skala enterprise.",
      },
      {
        jabatan:
          "System Administrator",
        icon: "fa-server",
        desc: "Mengelola, memelihara, dan mengoptimalkan server serta sistem operasi dalam lingkungan produksi.",
      },
      {
        jabatan: "Web Developer",
        icon: "fa-code",
        desc: "Membangun aplikasi dan website yang fungsional, responsif, dan berperforma tinggi.",
      },
      {
        jabatan:
          "IT Support Specialist",
        icon: "fa-headset",
        desc: "Memberikan dukungan teknis komprehensif kepada pengguna, hardware, software, dan sistem.",
      },
      {
        jabatan:
          "Cyber Security Analyst",
        icon: "fa-shield-halved",
        desc: "Menganalisis, mendeteksi, dan merespons ancaman keamanan siber dalam ekosistem digital.",
      },
      {
        jabatan: "Cloud Engineer",
        icon: "fa-cloud",
        desc: "Mengelola infrastruktur cloud (AWS/GCP/Azure) dan merancang solusi berbasis cloud.",
      },
    ],
    kurikulum: [
      {
        fase: "Kelas X",
        fokus:
          "Fondasi TKJ: perakitan hardware, instalasi OS, konsep jaringan dasar, dan pengantar pemrograman.",
      },
      {
        fase: "Kelas XI",
        fokus:
          "Pendalaman: administrasi jaringan enterprise, server Linux, keamanan siber, dan pengembangan web.",
      },
      {
        fase: "Kelas XII",
        fokus:
          "Aplikasi: proyek akhir, PKL (Praktik Kerja Lapangan), sertifikasi kompetensi, dan persiapan karir.",
      },
    ],
  },
};




export { G };
window.G = G; // Expose to global for vanilla interop


