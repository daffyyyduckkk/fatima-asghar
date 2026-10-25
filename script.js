// ===== EDIT HERE when you publish a new episode =====
// 1) change `ep`, `count` and `link` below to the newest episode.
// 2) visitors who haven't seen it get the popup once.
const LATEST = {
  id: "maqsad",
  title: "Maqsad",
  ur: "مقصد",
  ep: "Episode 9",
  count: 9,
  link: "https://drive.google.com/file/d/1LBqU7Tj4uKaKUPNqRQ6zY1dT3z03nZXC/view?usp=sharing"
};
// ====================================================

const $ = s => document.querySelector(s);

/* year */
const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

/* ---------- Sidebar drawer (phones) ---------- */
(function () {
  const side = $('#side'), veil = $('#veil'), mb = $('#mb');
  if (!side || !mb) return;
  const open = on => {
    side.classList.toggle('open', on);
    veil.hidden = !on;
    mb.setAttribute('aria-expanded', on);
    if (on) { const x = $('#sideX'); x && x.focus(); } else mb.focus({ preventScroll: true });
  };
  mb.onclick = () => open(!side.classList.contains('open'));
  $('#sideX').onclick = () => open(false);
  veil.onclick = () => open(false);
  side.addEventListener('click', e => { if (e.target.closest('a')) open(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && side.classList.contains('open')) open(false); });
})();

/* ---------- Back to top ---------- */
(function () {
  const tp = $('#top'); if (!tp) return;
  tp.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
  addEventListener('scroll', () => tp.classList.toggle('show', scrollY > 600), { passive: true });
})();

/* ---------- Falling leaves ---------- */
(function () {
  const cv = $('#petals'); if (!cv) return;
  const x = cv.getContext('2d'), red = matchMedia('(prefers-reduced-motion:reduce)');
  let W, H, P = [], run = true, last = 0, acc = 0, cap = 6, raf;
  function size() {
    const d = devicePixelRatio || 1;
    W = innerWidth; H = innerHeight;
    cv.width = W * d; cv.height = H * d;
    x.setTransform(d, 0, 0, d, 0, 0);
    cap = Math.min(8, Math.max(3, W / 150 | 0));
    if (red.matches) P.forEach(leaf);
  }
  addEventListener('resize', size); size();
  const cols = ['#8D493A', '#B07A68', '#C9A68F', '#D0B8A8'];
  const mk = top => ({
    x: Math.random() * W, y: top ? -30 : Math.random() * H,
    s: 6 + Math.random() * 4, v: .22 + Math.random() * .2,
    sw: Math.random() * 6, sp: .005 + Math.random() * .006,
    r: Math.random() * 6, rs: (Math.random() - .5) * .01,
    c: cols[Math.random() * cols.length | 0], a: .5 + Math.random() * .25
  });
  for (let i = 0; i < cap / 2; i++) P.push(mk(false));
  function leaf(p) {
    const s = p.s;
    x.save(); x.translate(p.x, p.y); x.rotate(p.r);
    x.scale(.6 + .4 * Math.abs(Math.cos(p.sw)), 1);
    x.globalAlpha = p.a; x.fillStyle = p.c;
    x.beginPath(); x.moveTo(0, -s * 1.4);
    x.bezierCurveTo(s * .95, -s * .5, s * .8, s * .8, 0, s * 1.4);
    x.bezierCurveTo(-s * .8, s * .8, -s * .95, -s * .5, 0, -s * 1.4);
    x.fill();
    x.strokeStyle = '#F8EDE3'; x.globalAlpha = .55; x.lineWidth = .8;
    x.beginPath(); x.moveTo(0, -s * 1.1); x.lineTo(0, s * 1.7); x.stroke();
    x.restore();
  }
  function tick(t) {
    if (!run) return;
    const dt = Math.min(t - last, 50) || 16; last = t; acc += dt;
    if (acc > 2600 && P.length < cap) { acc = 0; P.push(mk(true)); }
    x.clearRect(0, 0, W, H);
    P = P.filter(p => {
      const k = dt / 16;
      p.sw += p.sp * k; p.x += (Math.sin(p.sw) * .4 + .1) * k; p.y += p.v * k; p.r += p.rs * k;
      leaf(p);
      return p.y < H + 30 && p.x < W + 30;
    });
    raf = requestAnimationFrame(tick);
  }
  const start = () => { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(tick); };
  document.addEventListener('visibilitychange', () => {
    run = !document.hidden;
    if (run && !red.matches) start(); else cancelAnimationFrame(raf);
  });
  red.matches ? P.forEach(leaf) : start();
})();

/* ---------- New-episode popup (once per visitor per new episode) ---------- */
(function () {
  const pop = $('#pop'); if (!pop) return;
  const KEY = 'seenEp2:' + LATEST.id;
  const get = () => { try { return +localStorage.getItem(KEY) || 0 } catch (e) { return 0 } };
  const set = v => { try { localStorage.setItem(KEY, v) } catch (e) { } };
  if (get() >= LATEST.count) return;

  $('#popT').textContent = LATEST.title + ' — ' + LATEST.ep + ' is out!';
  $('#popU').textContent = LATEST.ur;
  $('#popS').textContent = 'A new chapter has just been published.';
  const go = $('#popGo'); go.href = LATEST.link;

  const esc = e => { if (e.key === 'Escape') close(); };
  const close = () => { pop.hidden = true; set(LATEST.count); document.removeEventListener('keydown', esc); };

  setTimeout(() => {
    pop.hidden = false;
    go.focus({ preventScroll: true });
    document.addEventListener('keydown', esc);
  }, 1200);
  $('#popX').onclick = close;
  go.addEventListener('click', close);
  pop.addEventListener('click', e => { if (e.target === pop) close(); });
})();
