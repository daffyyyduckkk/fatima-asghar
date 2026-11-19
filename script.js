// Episode data lives in episodes.js (loaded before this file) -- edit THAT file, not this one.

const LATEST = (() => {
  const n = NOVELS[FEATURED];
  const list = (n.episodes || []).filter(e => e && e.title && e.link);
  if (!list.length) return null;
  const last = list[list.length - 1];
  const isEp = /^\s*episode\b/i.test(last.title);
  return {
    id: FEATURED, title: n.title, ur: n.ur, count: list.length, link: last.link,
    label: last.title + (last.tag ? ' (' + last.tag + ')' : ''),
    pill: isEp ? 'New episode' : 'New update',
    note: last.note || (isEp ? 'A new chapter has just been published.' : 'A new update has just been published.')
  };
})();

const $ = s => document.querySelector(s);

/* year */
const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

/* ---------- Episode list (built from episodes.js) ---------- */
(function () {
  const ol = $('#eps'); if (!ol) return;
  const n = NOVELS[ol.dataset.novel]; if (!n) return;
  const list = (n.episodes || []).filter(e => e && e.title && e.link);
  const mk = (tag, cls) => { const el = document.createElement(tag); if (cls) el.className = cls; return el; };

  list.forEach(ep => {
    const li = mk('li'), a = mk('a');
    a.href = ep.link; a.target = '_blank'; a.rel = 'noopener';
    const name = mk('span'); name.textContent = ep.title;
    if (ep.tag) { const b = mk('em', 'badge'); b.textContent = ep.tag; name.append(' ', b); }
    const st = mk('span', 'st'); st.textContent = 'Published \u2192';
    a.append(name, st); li.append(a); ol.append(li);
  });

  // "Coming soon" placeholder: hidden once the story is marked finished
  const finished = list.some(e => /^(last|final|complete[d]?|end)$/i.test((e.tag || '').trim()));
  if (n.soon && !finished) {
    const nums = list.map(e => /^\s*episode\s+(\d+)/i.exec(e.title)).filter(Boolean).map(m => +m[1]);
    const next = (nums.length ? Math.max(...nums) : 0) + 1;
    const li = mk('li'), box = mk('span', 'e soon');
    const name = mk('span'); name.textContent = 'Episode ' + next;
    const st = mk('span', 'st'); st.textContent = 'Coming soon';
    box.append(name, st); li.append(box); ol.append(li);
  }
})();

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

/* ---------- New-update popup (once per visitor per new last entry) ---------- */
(function () {
  const pop = $('#pop'); if (!pop || !LATEST) return;
  const KEY = 'seenEp3:' + LATEST.id;       // remembers the LINK of the last entry the visitor has seen
  const OLD = 'seenEp2:' + LATEST.id;       // old versions remembered an episode COUNT
  const get = k => { try { return localStorage.getItem(k) } catch (e) { return null } };
  const set = v => { try { localStorage.setItem(KEY, v) } catch (e) { } };

  const seen = get(KEY);
  if (seen === LATEST.link) return;                                  // already saw this one
  if (seen === null && (+get(OLD) || 0) >= LATEST.count) return;     // saw it under the old system

  const pill = pop.querySelector('.pill'); if (pill) pill.textContent = LATEST.pill;
  $('#popT').textContent = LATEST.title + ' \u2014 ' + LATEST.label + ' is out!';
  $('#popU').textContent = LATEST.ur;
  $('#popS').textContent = LATEST.note;
  const go = $('#popGo'); go.href = LATEST.link; go.target = '_blank'; go.rel = 'noopener';

  const esc = e => { if (e.key === 'Escape') close(); };
  const close = () => { pop.hidden = true; set(LATEST.link); document.removeEventListener('keydown', esc); };

  setTimeout(() => {
    pop.hidden = false;
    go.focus({ preventScroll: true });
    document.addEventListener('keydown', esc);
  }, 1200);
  $('#popX').onclick = close;
  go.addEventListener('click', close);
  pop.addEventListener('click', e => { if (e.target === pop) close(); });
})();
