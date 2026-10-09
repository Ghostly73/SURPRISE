/* ===== Logika halaman Memory (data diambil dari config.js) =====
   Susunan gaya Pinterest: urutan tetap kiri -> kanan, tapi tiap kartu
   masuk ke kolom yang paling pendek, jadi tidak ada ruang kosong. */

const $ = id => document.getElementById(id);
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; };
function ytId(u) { const m = u.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/); return m ? m[1] : null; }

const MIN_LEBAR = 230;   // lebar minimal 1 kolom (px)
const JARAK = 24;        // jarak antar kolom (px)
const grids = [];        // tiap grup masonry: { box, cards }

function buatKartu(m, penuh) {
  const card = el('div', 'polaroid reveal zoom' + (penuh ? ' penuh' : ''));
  let media;
  if (m.type === 'video') {
    const id = ytId(m.src);
    if (id) { media = el('iframe'); media.src = 'https://www.youtube.com/embed/' + id; media.allowFullscreen = true; }
    else { media = el('video'); media.src = m.src; media.controls = true; media.playsInline = true; media.preload = 'metadata'; }
  } else {
    media = el('img'); media.src = m.src; media.alt = m.caption || ''; media.loading = 'lazy';
    media.onclick = () => { $('lightbox').querySelector('img').src = m.src; $('lightbox').style.display = 'flex'; };
  }
  card.appendChild(media);
  if (m.caption) card.appendChild(el('div', 'cap', m.caption));
  return card;
}

// susun ulang satu grup: taruh tiap kartu ke kolom terpendek (urutan tetap)
function susun(g) {
  const lebar = g.box.clientWidth || 600;
  const n = Math.max(1, Math.floor((lebar + JARAK) / (MIN_LEBAR + JARAK)));
  g.box.textContent = '';
  const kolom = Array.from({ length: n }, () => g.box.appendChild(el('div', 'mcol')));
  g.cards.forEach(c => {
    let pendek = kolom[0];
    kolom.forEach(k => { if (k.offsetHeight < pendek.offsetHeight) pendek = k; });
    pendek.appendChild(c);
  });
}
let jadwal = 0;
function susunSemua() {
  cancelAnimationFrame(jadwal);
  jadwal = requestAnimationFrame(() => grids.forEach(susun));
}

if (!CONFIG.memory.length) {
  $('emptyMsg').style.display = 'block';
} else {
  // bagi daftar menjadi grup. "judul" dan ukuran "penuh" memutus grup masonry.
  let grup = null;
  const mulaiGrup = () => {
    grup = { box: el('div', 'masonry'), cards: [] };
    $('memory').appendChild(grup.box);
    grids.push(grup);
  };
  CONFIG.memory.forEach(m => {
    if (m.type === 'judul') {
      $('memory').appendChild(el('h3', 'memGroup reveal up', m.teks));
      grup = null;
    } else if (m.ukuran === 'penuh') {
      $('memory').appendChild(buatKartu(m, true));
      grup = null;
    } else {
      if (!grup) mulaiGrup();
      const card = buatKartu(m, false);
      grup.cards.push(card);
      // tinggi kartu baru diketahui setelah media dimuat -> susun ulang
      const media = card.querySelector('img, video');
      if (media) { media.addEventListener('load', susunSemua); media.addEventListener('loadedmetadata', susunSemua); }
    }
  });
  grids.forEach(susun);
  window.addEventListener('resize', susunSemua);
  window.addEventListener('load', susunSemua);
}
$('lightbox').onclick = () => $('lightbox').style.display = 'none';

// efek muncul saat scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(x => io.observe(x));
