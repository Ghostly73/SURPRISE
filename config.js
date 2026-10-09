/* ================= DATA (EDIT DI SINI SAJA) ================= */
const CONFIG = {
  nama: "Hestiii Ruwaidaaaaa💖",
  dari: "Justfriendmu, fans emyuuu #GGMU",
  tanggalBuka: "2026-10-04T00:00:00+07:00", // "" = langsung buka tanpa hitung mundur
  judul: "Happy Birthday My Loveee!",
  penutup: "I Love You In Every Universe 💖",

  pesan: [
    "Hai sayaangg adek kecil, ada sesuatu yang mau kusampein…",
    "Terima kasih sudah jadi orang yang selalu ada buat aku, orang yang membuatku bangkit lagi untuk memulai kehidupan",
    "Semoga di usia yang ke-20 tahun ini penuh hal-hal baik dan senyum yang banyak, apa yang kamu inginkan juga disegerakan, aamiin",
    "Sekali lagi, Happy B-Day My Loveee! 🎂"
  ],

  sorotan: "CIIIEEEEE WES 20th ARREK E ASEK, HAPPY SELALU YAAKK !!",

  /* KARTU KALIMAT (tersembunyi di atas JOURNEY, memanjang ke bawah saat di-tap)
     judul & dari boleh dikosongkan (""). Hapus seluruh blok = kartu hilang. */
  kartuKalimat: {
    tombol: "Ada sesuatu nihhh 💌",
    judul: "To: Hesti Ruawaida",
    isi: "Makasih ya udah jadi bagian dari cerita aku. Semoga kamu selalu dikelilingi hal-hal baik, dan semoga aku bisa jadi salah satunya 🤍",
    dari: "Ghazy Kalimasada"
  },

  /* Linimasa (boleh dikosongkan: linimasa: []) */
  linimasa: [
    { tanggal: "1 Mei 2026", teks: "Chatan lagi setelah sekian abad, wkwkw" },
    { tanggal: "12 Mei 2026", teks: "Keluar buat yang pertama kali, canggung banget wkwkw" },
    { tanggal: "27 Juni 2026", teks: "Keluar yang ke-3 (berdua aja) dan wes gak canggung neh + pertama kali juga bikin trend, EAAA KENA GOCEK AOWKWKW" },
    { tanggal: "1 Agustus 2026", teks: "Kta keluar terakhir sebelum LDR 😔, Nyore ke laut malah sampek malam wkwk akhire ke teajus 😆" },
    { tanggal: "Hari ini", teks: "Dan sekarang aku bikin ini" }
  ],

  /* MEMORY: foto & video (tampil di halaman memory.html)
     type "foto"  -> src = nama file ("foto1.jpg") ATAU link gambar (https://...jpg)
     type "video" -> src = file mp4 ("video1.mp4") ATAU link YouTube (https://youtu.be/xxxx) */
  memory: [
    { type: "foto",  src: "PIC/5.jpg",   caption: "Habis jalan pagi" },
    { type: "foto",  src: "PIC/1.jpg",   caption: "Pertama kali keluar bareng" },
    { type: "foto",  src: "PIC/2.jpg",   caption: "Kopken" },
    { type: "video", src: "VID/vid-1.mp4", caption: "Trend pertama yang kita buat" },
    { type: "video", src: "VID/vid-4.mp4", caption: "Sebelum kamu ke malang" },
    { type: "foto",  src: "PIC/3.jpg",   caption: "Kamu kasih gift di B-Day ku" },
    { type: "foto",  src: "PIC/4.jpg",   caption: "Geprek bromo"},
    { type: "foto",  src: "PIC/23.jpg",   caption: "Geprek bromo"},
    { type: "foto",  src: "PIC/7.jpg",   caption: "Nyore di laut" },
    { type: "foto",  src: "PIC/11.jpg",   caption: "Nyore di laut #4" },
    { type: "foto",  src: "PIC/9.jpg",   caption: "Nyore di laut #2" },
    { type: "foto",  src: "PIC/10.jpg",   caption: "Nyore di laut #3" },
    { type: "foto",  src: "PIC/22.jpg",   caption: " ✌🏻" },
    { type: "foto",  src: "PIC/12.jpg",   caption: "☝🏻" },
    { type: "foto",  src: "PIC/13.jpg",   caption: "Simulasi jadi ibu" },
    { type: "foto",  src: "PIC/15.jpg",   caption: "Arek Polinema" },
    { type: "foto",  src: "PIC/16.jpg",   caption: "Menjadi imut, wkwkwk" },
    { type: "video", src: "VID/vid-3.mp4", caption: "Sebelum LDR 😞" },
    { type: "video", src: "VID/vid-5.mp4", caption: "Permohonan Menjadi Justfriend" },
    { type: "video", src: "VID/vid-2.mp4", caption: "JJ" },
    { type: "foto",  src: "PIC/18.jpg",   caption: "🤏🏻" },
    { type: "foto",  src: "PIC/21.jpg",   caption: "Hesti kecil" },
    { type: "foto",  src: "PIC/20.jpg",   caption: "😄" },
    { type: "foto",  src: "PIC/24.jpg",   caption: "Di kampus" },
    { type: "video", src: "VID/vid-6.mp4", caption: "MT. KELUD 1731 MDPL" },
    { type: "foto",  src: "PIC/19.jpg",   caption: "🧍‍♀️" },
    { type: "foto",  src: "PIC/25.jpg",   caption: "💢" },
    { type: "video", src: "VID/vid-7.mp4", caption: "MIE BAYAM" },
    
    
    // { type: "video", src: "video1.mp4", caption: "Momen lucu waktu itu" },
    // { type: "video", src: "https://youtu.be/XXXXXXXXXXX", caption: "Lagu kita" },
  ],

  /* MUSIK LATAR (mulai saat tombol GASKAN ditekan) */
  musik: {
    src: "Music/anyone.mp3",
    volume: 0.6
  },

  /* GIFT CARD (tersembunyi di halaman utama, terbuka saat di-tap)
     kode & berlaku boleh dihapus kalau tidak dipakai. Hapus seluruh blok hadiah = kartu hilang. */
  hadiah: {
    judul: "Gift Card",
    nilai: "Traktir makan 1x 🍜",
    pesan: "Berlaku kapan aja kamu mau, tinggal bilang ya!",
    kode: "HESTI-20TH",
    berlaku: "Berlaku selamanya 💖"
  }
};
