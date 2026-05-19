"use strict";

/* ===== INIT ===== */
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

/* ===== SCROLL PROGRESS ===== */
const sp = document.getElementById('sp');
window.addEventListener('scroll', () => {
  const t = document.documentElement.scrollHeight - window.innerHeight;
  if (sp) sp.style.width = (t > 0 ? (window.scrollY / t) * 100 : 0) + '%';
}, { passive: true });

/* ===== TABS ===== */
const panels    = Array.from(document.querySelectorAll('.panel'));
const navLinks  = Array.from(document.querySelectorAll('.nl'));
const navLinksEl = document.getElementById('navLinks');
const burger    = document.getElementById('burger');

function setTab(id, push = true) {
  if (!panels.some(p => p.id === id)) return;

  panels.forEach(p => p.classList.remove('active'));
  navLinks.forEach(b => b.classList.remove('active'));

  const panel = document.getElementById(id);
  if (panel) { panel.classList.add('active'); }

  navLinks.forEach(b => { if (b.dataset.tab === id) b.classList.add('active'); });

  // Reveal elements
  setTimeout(() => {
    panel?.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    triggerProcess(panel);
  }, 60);

  closeMobile();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (push) history.pushState(null, '', '#' + id);
}

function initFromHash() {
  const h = location.hash.replace('#', '') || 'home';
  const ok = panels.some(p => p.id === h);
  setTab(ok ? h : 'home', false);
}

// Data-tab clicks
document.querySelectorAll('[data-tab]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    setTab(el.dataset.tab);
  });
});

window.addEventListener('popstate', initFromHash);
initFromHash();

// Initial reveal
setTimeout(() => {
  const active = document.querySelector('.panel.active');
  if (active) active.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}, 120);

/* ===== MOBILE MENU ===== */
function closeMobile() {
  navLinksEl?.classList.remove('open');
  burger?.setAttribute('aria-expanded', 'false');
}

burger?.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  burger.setAttribute('aria-expanded', open.toString());
});

document.addEventListener('click', e => {
  if (navLinksEl?.classList.contains('open') &&
      !navLinksEl.contains(e.target) && !burger?.contains(e.target)) closeMobile();
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobile(); });

/* ===== REVEAL (IntersectionObserver) ===== */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ===== PROCESS BAR ANIMATION ===== */
function triggerProcess(root = document) {
  const steps = Array.from(root?.querySelectorAll('#processBar .ps') || []);
  if (!steps.length) return;
  steps.forEach(s => s.classList.remove('vis'));
  steps.forEach((s, i) => setTimeout(() => s.classList.add('vis'), 160 + i * 130));
}

const procObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { triggerProcess(document); procObs.unobserve(e.target); }
  });
}, { threshold: 0.3 });
const procBar = document.getElementById('processBar');
if (procBar) procObs.observe(procBar);

/* ===== COUNTER ANIMATION ===== */
const counted = new Set();

function animCount(el) {
  if (counted.has(el)) return;
  counted.add(el);
  const tgt     = parseFloat(el.dataset.target);
  const suffix  = el.dataset.suffix  || '';
  const prefix  = el.dataset.prefix  || '';
  const decimal = el.dataset.decimal === 'true';
  const dur     = 1800;
  const t0      = performance.now();

  function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    const v = e * tgt;
    if (decimal) {
      el.textContent = prefix + v.toFixed(1).replace('.', ',') + suffix;
    } else if (tgt >= 1000) {
      el.textContent = prefix + Math.floor(v).toLocaleString('fr-FR') + suffix;
    } else {
      el.textContent = prefix + Math.floor(v) + suffix;
    }
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting && e.target.dataset.target) animCount(e.target); });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => cntObs.observe(el));

/* ===== MOUSE GLOW on cards ===== */
document.querySelectorAll('.hw,.pj,.sk,.cc,.fc,.stat,.ek,.kc').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top)  + 'px');
  }, { passive: true });
});

/* ===== 3D TILT ===== */
const TILT = 6;
document.querySelectorAll('.hw,.pj,.sk,.fc,.stat,.ek,.kc,.hw.glass').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r  = el.getBoundingClientRect();
    const x  = ((e.clientX - r.left) / r.width  - 0.5) * TILT;
    const y  = ((e.clientY - r.top)  / r.height - 0.5) * TILT;
    el.style.transition = 'transform .12s ease';
    el.style.transform  = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-4px)`;
  }, { passive: true });

  el.addEventListener('mouseleave', () => {
    el.style.transition = 'transform .5s cubic-bezier(.22,.68,0,1.2)';
    el.style.transform  = '';
  });
});

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.fi').forEach(item => {
  const btn = item.querySelector('.fq');
  const ans = item.querySelector('.fa');
  if (!btn || !ans) return;

  ans.style.maxHeight = '0';

  btn.addEventListener('click', () => {
    const open = item.classList.contains('open');
    document.querySelectorAll('.fi.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.fa').style.maxHeight = '0';
    });
    if (!open) {
      item.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
});

/* ===== COPY EMAIL ===== */
const copyBtn = document.getElementById('copyEmail');
const cpLbl   = document.getElementById('cpLbl');
const toast   = document.getElementById('toast');
const EMAIL   = 'luludavril12@gmail.com';

copyBtn?.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(EMAIL); }
  catch {
    const ta = Object.assign(document.createElement('textarea'), { value: EMAIL });
    Object.assign(ta.style, { position: 'fixed', opacity: '0' });
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand('copy'); } catch {}
    ta.remove();
  }
  if (cpLbl) cpLbl.textContent = 'Copié !';
  if (toast) toast.classList.add('show');
  setTimeout(() => {
    if (cpLbl) cpLbl.textContent = 'Copier';
    if (toast) toast.classList.remove('show');
  }, 1600);
});

/* ===== IMAGE FALLBACK ===== */
document.querySelectorAll('.ic img, .piw img').forEach(img => {
  img.addEventListener('error', () => {
    const wrap = img.closest('.ic') || img.closest('.piw');
    if (!wrap) return;
    img.remove();
    wrap.classList.add('noimg');
    const ph = document.createElement('span');
    ph.textContent = '📷'; ph.setAttribute('aria-hidden', 'true');
    wrap.appendChild(ph);
  });
});
