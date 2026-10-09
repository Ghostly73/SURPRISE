/* ===== Logika halaman utama (data diambil dari config.js) ===== */

const $ = id => document.getElementById(id);
const fill = t => t.replaceAll('{nama}', CONFIG.nama).replaceAll('{dari}', CONFIG.dari);
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; };

$('startTitle').textContent = `Surprise for My Love ${CONFIG.nama}`;
$('judul').textContent = CONFIG.judul;
$('penutup').textContent = CONFIG.penutup;
$('dari').textContent = "— " + CONFIG.dari;
$('sorotan').textContent = CONFIG.sorotan;
if (!CONFIG.sorotan) $('band').style.display = 'none';

// pesan
CONFIG.pesan.forEach((t, i) => $('bubbles').appendChild(el('div', 'bubble reveal ' + (i % 2 ? 'right' : 'left'), fill(t))));

// linimasa
if (CONFIG.linimasa.length) {
  $('tlSection').style.display = 'block';
  CONFIG.linimasa.forEach(x => {
    const d = el('div', 'tl reveal up');
    d.append(el('b', '', x.tanggal), el('p', '', x.teks));
    $('timeline').appendChild(d);
  });
}

// tombol menuju halaman Memory (muncul kalau ada isinya)
if (CONFIG.memory.length) $('memSection').style.display = 'block';

// kartu kalimat (tersembunyi sampai di-tap; hilang otomatis kalau "kartuKalimat" kosong di config.js)
const K = CONFIG.kartuKalimat;
if (K && K.isi) {
  $('noteSection').style.display = 'block';
  $('noteIsi').textContent = K.isi;
  if (K.judul) $('noteJudul').textContent = K.judul; else $('noteJudul').style.display = 'none';
  if (K.dari) $('noteDari').textContent = '— ' + K.dari; else $('noteDari').style.display = 'none';
  const labelTombol = K.tombol || 'Tap untuk baca';
  $('noteBtnText').textContent = labelTombol;
  $('noteBtn').onclick = () => {
    const card = $('noteCard');
    const buka = !card.classList.contains('open');
    card.classList.toggle('open', buka);
    $('noteBtn').setAttribute('aria-expanded', buka);
    $('noteBtnText').textContent = buka ? 'Tutup' : labelTombol;
    if (buka) setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350);
  };
}

// gift card (tersembunyi sampai di-tap; hilang otomatis kalau "hadiah" kosong di config.js)
const H = CONFIG.hadiah;
if (H && (H.nilai || H.pesan)) {
  $('giftSection').style.display = 'block';
  $('gcJudul').textContent = H.judul || 'Gift Card';
  $('gcNilai').textContent = H.nilai || '';
  $('gcPesan').textContent = H.pesan || '';
  if (H.kode) $('gcKode').textContent = H.kode; else $('gcKode').style.display = 'none';
  if (H.berlaku) $('gcBerlaku').textContent = H.berlaku; else $('gcBerlaku').style.display = 'none';
  const g = $('giftcard');
  const toggleGift = () => {
    const baruDibuka = !g.classList.contains('open');
    g.classList.toggle('open');
    if (baruDibuka) confetti();
  };
  g.onclick = toggleGift;
  g.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleGift(); } };
}

// tombol mulai
$('startBtn').onclick = () => {
  $('start').style.display = 'none';
  const target = CONFIG.tanggalBuka ? new Date(CONFIG.tanggalBuka).getTime() : 0;
  if (Date.now() >= target) return openSite();
  $('wait').style.display = 'flex';
  const t = setInterval(() => {
    const left = target - Date.now();
    if (left <= 0) { clearInterval(t); $('wait').style.display = 'none'; return openSite(); }
    $('d').textContent = Math.floor(left / 864e5);
    $('h').textContent = Math.floor(left % 864e5 / 36e5);
    $('m').textContent = Math.floor(left % 36e5 / 6e4);
    $('s').textContent = Math.floor(left % 6e4 / 1e3);
  }, 500);
};

function openSite() {
  simpan();   // supaya balik dari Memory tidak mulai dari awal lagi
  $('site').style.display = 'block';
  window.scrollTo(0, 0);
  confetti();
  floaties();
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  }), { threshold: .2 });
  document.querySelectorAll('.reveal').forEach(x => io.observe(x));
}

// hati melayang di hero
function floaties() {
  const emo = ['💖', '✨', '💜', '🎈', '🌸'];
  for (let i = 0; i < 14; i++) {
    const f = el('div', 'floaty', emo[i % emo.length]);
    f.style.left = Math.random() * 100 + '%';
    f.style.fontSize = 16 + Math.random() * 22 + 'px';
    f.style.animationDuration = 8 + Math.random() * 8 + 's';
    f.style.animationDelay = -Math.random() * 10 + 's';
    $('hero').appendChild(f);
  }
}

// konfeti
function confetti() {
  const c = $('confetti'), ctx = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  const colors = ['#ff7eb3','#ffd166','#06d6a0','#118ab2','#fff'];
  const parts = Array.from({length: 140}, () => ({
    x: Math.random() * c.width, y: -20 - Math.random() * c.height,
    r: 4 + Math.random() * 6, v: 2 + Math.random() * 4,
    c: colors[Math.floor(Math.random() * colors.length)], a: Math.random() * 6
  }));
  let n = 0;
  (function loop() {
    ctx.clearRect(0, 0, c.width, c.height);
    parts.forEach(p => { p.y += p.v; p.x += Math.sin(p.a += .05) * 1.5; ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, p.r, p.r * 1.6); });
    if (++n < 300) requestAnimationFrame(loop); else ctx.clearRect(0, 0, c.width, c.height);
  })();
}

// kalau kembali dari halaman Memory, langsung tampilkan halaman utama
// (penyimpanan dibungkus try/catch + ada cadangan lewat "#kembali" di link, supaya tetap jalan walau storage diblokir)
function sudahBuka() { try { return sessionStorage.getItem('opened') === '1'; } catch (e) { return false; } }
function simpan() { try { sessionStorage.setItem('opened', '1'); } catch (e) {} }
if (sudahBuka() || location.hash === '#kembali') { $('start').style.display = 'none'; openSite(); }
