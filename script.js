// ===== EDIT YOUR CONTENT HERE =====
// To add a new novel: copy the whole { ... } block below, paste it after a comma, and change the id, title, texts, etc.
// The id is used in the link (#/novel/<id>), so keep it short, lowercase, no spaces.
// Optional per-novel field:  plats: [["Name", "https://..."]]  (if left out, the PLATFORMS list below is used)
const NOVELS = [
  {
    id: "maqsad",
    title: "Maqsad",
    ur: "مقصد",
    status: "Ongoing",
    tag: "Crime thriller · Slow-burn romance",
    img: "maqsad-cover.webp",
    lines: [
      "مقصد اسلام آباد کے پس منظر میں لکھی گئی ایک کرائم تھرلر ہے، جہاں عزت دار چہرے اکثر نقاب ثابت ہوتے ہیں، اور سب سے قریبی لوگ بھی وہ نہیں ہوتے جو دکھائی دیتے ہیں۔ ایک طرف ایک مضبوط سلطنت ہے جس کے دامن پر کوئی داغ نظر نہیں آتا؛ دوسری طرف قانون کے وہ پاسدار ہیں جو اسے گرانے کے لیے جھوٹا روپ دھارنے سے بھی نہیں ہچکچاتے۔ ان کے بیچ وفاداریاں ہیں جو خون سے گہری ہیں، ایک ماضی ہے جو چپ رہنے سے انکاری ہے، ایک دکھ ہے جسے کبھی صبر نہ آ سکا۔",
      "تحقیقات کے نیچے محبت، پچھتاوے، اور کھو دیے گئے لوگوں کے قرض کی ایک خاموش کہانی چلتی ہے۔ ایسی دنیا میں جہاں ہر کوئی ایک چہرہ پہن کر جیتا ہے، اصل خطرہ یہ نہیں کہ آپ کس پر بھروسہ کرتے ہیں، بلکہ یہ ہے کہ آپ کس کی پروا کرنے لگتے ہیں۔"
    ],
    // [English name, Urdu name]
    chars: [
      ["Shifa Javed", "شِفا جاوید"],
      ["Shahan Affandi", "شاہان آفندی"],
      ["Hafsa Affandi", "حفصہ آفندی"],
      ["Asfandyar Khanzada", "اسفندیار خانزادہ"],
      ["Feroz Affandi", "فیروز آفندی"],
      ["Taimoor Rehman", "تیمور رحمان"]
    ],
    // HOW TO PUBLISH A NEW EPISODE:
    // 1) change ["Episode 2", "Coming soon"] to ["Episode 2", "Published", "YOUR-LINK"]
    // 2) add a new line below it: ["Episode 3", "Coming soon"]   (every line ends with a comma except the last)
    // The popup appears once per visitor for each episode that has a link.
    eps: [
      ["Episode 1", "Published", "https://drive.google.com/file/d/1bx4zuBng0N1-0Kgtf6HNzt00x6Wq-5lL/view?usp=sharing"],
      ["Episode 2", "Published", "https://drive.google.com/file/d/1OEEJRFoJmDVyvtqVFHDKDjZs9TnBan23/view?usp=sharing"],
      ["Episode 3", "Published", "https://drive.google.com/file/d/1Yf_c8aWoMLm1pVvbEmqT5jmGsJMyNctC/view?usp=sharing"],
      ["Episode 4", "Published", "https://drive.google.com/file/d/1X86PeRNIQAtuKnuCAL43UAa-pipPEoVs/view?usp=sharing"],
      ["Episode 5", "Published", "https://drive.google.com/file/d/1pMGpeNNVIUzq3EJyr7nTqzgWWmFjSKSU/view?usp=sharing"],
      ["Episode 6", "Published", "https://drive.google.com/file/d/1sx9aydljQDLDxFqvg-YjTDd3z46A-15-/view?usp=sharing"],
      ["Episode 7", "Published", "https://drive.google.com/file/d/12L_thXJ0ANRW9Pdth_38qurlMV4YWtet/view?usp=sharing"],
      ["Episode 8", "Published", "https://drive.google.com/file/d/1bShtsutpCmdxp9qCGZ7q53PRmSRwgUS3/view?usp=sharing"],  
      ["Episode 9", "Published", "https://drive.google.com/file/d/1LBqU7Tj4uKaKUPNqRQ6zY1dT3z03nZXC/view?usp=sharing"], 
      ["Episode 10", "Coming Soon"],
    ]
  }
];
// ===================================
const PLATFORMS = [
  ["Novelstudio", "https://novelstudiopk.com/?s=Fatima+asghar"],
  ["Kitabera", "https://kitabera.vercel.app/writer/fatima-asghar"],
  ["Safar-e-Adab", "https://safareadab.com/author/asgharfatima/"],
  ["Novelshub.pk", "https://novelshub.pk/book-author/fatima-asghar"]
];
// Optional: give an episode its own link as a 3rd item, e.g. ["Episode 1", "Published", "https://..."]

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
$('#yr').textContent = new Date().getFullYear();

const cover = (n, eager) => `<div class="cv" data-t="${n.title}"><img src="${n.img}" alt="${n.title} cover" width="640" height="829" loading="${eager ? 'eager' : 'lazy'}"${eager ? ' fetchpriority="high"' : ''} onerror="this.parentNode.classList.add('nocover')"></div>`;

/* ---------- Render ---------- */
$('#list').innerHTML = NOVELS.map(n => `
  <a class="feat" href="#/novel/${n.id}">
    ${cover(n)}
    <div>
      <span class="pill">${n.status}</span>
      <h3>${n.title}</h3>
      <div class="ur" lang="ur" dir="rtl">${n.ur}</div>
      <div class="tag">${n.tag}</div>
      <p class="ub" lang="ur" dir="rtl">${n.lines[0]}</p>
      <span class="more">Read more →</span>
    </div>
  </a>`).join('');

const cast = a => `<div class="cast">${a.map(c =>
  `<div class="char"><b>${c[0]}</b><span class="ur" lang="ur" dir="rtl">${c[1]}</span></div>`).join('')}</div>`;

const eps = a => `<div class="eps">${a.map(e =>
  e[2] ? `<a class="ep" href="${e[2]}" target="_blank" rel="noopener"><b>${e[0]}</b><span>${e[1]} →</span></a>`
    : `<div class="ep${e[1] === 'Coming soon' ? ' soon' : ''}"><b>${e[0]}</b><span>${e[1]}</span></div>`).join('')}</div>`;

const plats = n => `<ul class="plats">${(n.plats || PLATFORMS).map(p =>
  `<li class="lnk"><a href="${p[1]}" target="_blank" rel="noopener">${p[0]}</a></li>`).join('')}</ul>`;

const page = n => `
  <a class="back" href="#novels">← All novels</a>
  <article class="np">
    ${cover(n, true)}
    <div>
      <span class="pill">${n.status}</span>
      <h1>${n.title}</h1>
      <div class="ur" lang="ur" dir="rtl">${n.ur}</div>
      <div class="tag">${n.tag}</div>
      <div class="lines">${n.lines.map(l => `<p class="ub" lang="ur" dir="rtl">${l}</p>`).join('')}</div>
      <h2 class="sh">Read on</h2>${plats(n)}
      ${n.chars && n.chars.length ? `<h2 class="sh">Characters</h2>${cast(n.chars)}` : ''}
      ${n.eps && n.eps.length ? `<h2 class="sh">Episodes</h2>${eps(n.eps)}` : ''}
    </div>
  </article>`;

/* ---------- Routing ---------- */
function route() {
  const m = location.hash.match(/^#\/novel\/([\w-]+)/);
  const n = m && NOVELS.find(x => x.id === m[1]);
  if (m && !n) history.replaceState(null, '', '#novels'); // unknown novel -> back to the list
  $('#homeView').hidden = !!n;
  $('#novelView').hidden = !n;
  if (n) {
    $('#novelView').innerHTML = page(n);
    document.title = n.title + ' — Fatima Asghar';
    scrollTo({ top: 0, behavior: 'instant' });
    const h = $('#novelView h1'); h.tabIndex = -1; h.focus({ preventScroll: true });
  } else {
    document.title = 'Fatima Asghar — Novels';
    const id = location.hash.slice(1);
    const el = id && document.getElementById(id);
    if (el) el.scrollIntoView(); else scrollTo({ top: 0, behavior: 'instant' });
  }
  closeMenu();
  spy();
}
addEventListener('hashchange', route);

/* ---------- Nav: mobile menu, back-to-top, active link ---------- */
function closeMenu() {
  $('#nav').classList.remove('nav-open');
  $('#mb').setAttribute('aria-expanded', 'false');
}
$('#nav').addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); }); // also when hash doesn't change
addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
$('#mb').onclick = () => {
  const open = $('#nav').classList.toggle('nav-open');
  $('#mb').setAttribute('aria-expanded', open);
};
const tp = $('#top');
tp.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

const links = $$('.lk a');
const mark = h => links.forEach(a => {
  const on = a.hash === h;
  a.classList.toggle('on', on);
  on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
});
function spy() {
  if (!$('#novelView').hidden) {
    mark('#novels');
    return;
  }
  let cur = '#home';
  ['home', 'novels', 'about', 'follow'].forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top < innerHeight * .4) cur = '#' + id;
  });
  mark(cur);
}
addEventListener('scroll', () => {
  tp.classList.toggle('show', scrollY > 600);
  spy();
}, { passive: true });

/* ---------- Reveal on scroll ---------- */
const rv = $$('.rv');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .08 });
  rv.forEach(e => io.observe(e));
} else rv.forEach(e => e.classList.add('in'));

/* Load the Urdu font once the page is ready; the text swaps to it as soon as it arrives */
(function () {
  if (!document.fonts || !document.fonts.load) return;
  const go = () => document.fonts.load('1.25rem "Noto Nastaliq Urdu"', 'مقصد').catch(() => { });
  document.readyState === 'complete' ? go() : addEventListener('load', go);
})();

document.documentElement.dataset.ok = 1; // tells the failsafe in index.html we loaded fine
route();

/* ---------- Vintage leaves ---------- */
(function () {
  const cv = $('#petals'), x = cv.getContext('2d'), red = matchMedia('(prefers-reduced-motion:reduce)');
  let W, H, P = [], run = true, last = 0, acc = 0, cap = 6, raf;
  function size() {
    const d = devicePixelRatio || 1;
    W = innerWidth; H = innerHeight;
    cv.width = W * d; cv.height = H * d;
    x.setTransform(d, 0, 0, d, 0, 0);
    cap = Math.min(8, Math.max(3, W / 150 | 0));
    if (red.matches) P.forEach(leaf); // resizing clears the canvas; redraw static leaves
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

/* ---------- New-episode popup (shows once per visitor for each new published episode) ---------- */
(function () {
  const pop = $('#pop');
  const KEY = 'seenEp2:';
  const get = k => { try { return +localStorage.getItem(k) || 0 } catch (e) { return 0 } };
  const set = (k, v) => { try { localStorage.setItem(k, v) } catch (e) { } };

  let hit = null;
  for (const n of NOVELS) {
    const pub = n.eps.filter(e => e[1] === 'Published' && e[2]);
    if (pub.length && pub.length > get(KEY + n.id)) { hit = { n, count: pub.length, ep: pub[pub.length - 1] }; break; }
  }
  if (!hit) return;

  $('#popT').textContent = hit.n.title + ' — ' + hit.ep[0] + ' is out!';
  $('#popU').textContent = hit.n.ur;
  $('#popS').textContent = 'A new chapter has just been published. Come and find out what happens next.';
  $('#popGo').href = hit.ep[2] || '#/novel/' + hit.n.id;
  if (hit.ep[2]) { $('#popGo').target = '_blank'; $('#popGo').rel = 'noopener'; }

  const esc = e => { if (e.key === 'Escape') close(); };
  const close = () => {
    pop.hidden = true;
    set(KEY + hit.n.id, hit.count);
    document.removeEventListener('keydown', esc);
  };

  setTimeout(() => {
    pop.hidden = false;
    $('#popGo').focus({ preventScroll: true });
    document.addEventListener('keydown', esc);
  }, 1200);

  $('#popX').onclick = close;
  $('#popGo').addEventListener('click', close);
  pop.addEventListener('click', e => { if (e.target === pop) close(); });
})();
