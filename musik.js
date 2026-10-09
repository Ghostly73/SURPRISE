/* ===== Musik latar (dipakai di index.html DAN memory.html) =====
   - Mulai saat tombol GASKAN ditekan (browser hanya mengizinkan suara setelah ada sentuhan).
   - Tombol 🎵 / 🔇 di pojok kanan bawah untuk memutar atau menjeda.
   - Saat pindah ke halaman Memory dan kembali, lagu lanjut dari posisi terakhir.
   Pengaturan ada di config.js (blok "musik"). Hapus blok itu = musik mati. */
(function () {
  const M = typeof CONFIG !== 'undefined' && CONFIG.musik;
  if (!M || !M.src) return;

  const KEY_ON = 'musikOn', KEY_T = 'musikT';
  const get = k => { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  const set = (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} };

  const audio = new Audio(M.src);
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = typeof M.volume === 'number' ? Math.min(1, Math.max(0, M.volume)) : 0.6;

  // tombol + gayanya (ditanam di sini supaya style.css tidak perlu diubah)
  const css = document.createElement('style');
  css.textContent = `
    #musikBtn { position: fixed; right: 16px; bottom: 16px; z-index: 60; width: 48px; height: 48px;
      margin: 0; padding: 0; border-radius: 50%; border: none; cursor: pointer; font-size: 1.3rem;
      display: none; align-items: center; justify-content: center;
      background: rgba(255,126,179,.92); color: #2a0a1f; box-shadow: 0 6px 18px rgba(0,0,0,.35); }
    #musikBtn.on { animation: musikDenyut 1.6s infinite; }
    @keyframes musikDenyut { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }`;
  document.head.appendChild(css);

  const btn = document.createElement('button');
  btn.id = 'musikBtn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Putar atau jeda musik');
  document.body.appendChild(btn);

  let gagal = false;   // true kalau file lagu tidak ketemu
  const render = () => {
    btn.textContent = audio.paused ? '🔇' : '🎵';
    btn.classList.toggle('on', !audio.paused);
    btn.title = audio.paused ? 'Putar musik' : 'Jeda musik';
  };
  const tampil = () => { if (!gagal) { btn.style.display = 'flex'; render(); } };
  const putar = () => audio.play().catch(() => {});

  audio.addEventListener('play', render);
  audio.addEventListener('pause', render);
  audio.addEventListener('error', () => {
    gagal = true; btn.style.display = 'none';
    console.warn('Musik tidak ditemukan: ' + M.src + ' (cek nama file & foldernya)');
  });

  btn.onclick = () => {
    if (audio.paused) { set(KEY_ON, '1'); putar(); }
    else { set(KEY_ON, '0'); audio.pause(); }
  };

  // lanjut dari posisi terakhir saat pindah halaman
  const t = parseFloat(get(KEY_T));
  if (t > 0) audio.addEventListener('loadedmetadata', () => {
    try { audio.currentTime = audio.duration ? t % audio.duration : t; } catch (e) {}
  }, { once: true });
  setInterval(() => { if (!audio.paused) set(KEY_T, audio.currentTime); }, 1000);
  addEventListener('pagehide', () => set(KEY_T, audio.currentTime));

  // index.html: mulai saat GASKAN ditekan
  const mulai = document.getElementById('startBtn');
  if (mulai) mulai.addEventListener('click', () => { set(KEY_ON, '1'); putar(); tampil(); });

  // halaman Memory, atau kembali ke index setelah kejutan dibuka
  const sudahBuka = !mulai || get('opened') === '1' || location.hash === '#kembali';
  if (sudahBuka) {
    tampil();
    if (get(KEY_ON) === '1') {
      // kalau browser menolak putar otomatis, lanjutkan di sentuhan pertama
      audio.play().catch(() => {
        addEventListener('pointerdown', () => { if (get(KEY_ON) === '1') putar(); }, { once: true });
      });
    }
  }
})();
