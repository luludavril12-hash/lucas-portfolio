"use strict";

/* ============================================================
   Lucas Davril — Portfolio · script.js · Premium Edition
   Features:
   - Tab navigation + hash routing
   - Scroll progress bar
   - Cursor glow
   - Animated orb cursor-follow
   - 3D card tilt
   - Magnetic buttons
   - Counter animations (IntersectionObserver)
   - Process bar sequential animation
   - Glow mouse-follow
   - FAQ accordion
   - Copy email
   - Image fallbacks
   ============================================================ */

/* ===== INIT ===== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ===== YEAR ===== */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== TABS ===== */
const navLinks = $$('.navlink');
const panels   = $$('.panel');
const brand    = $('.brand');
const nav      = $('#mainNav');
const burger   = $('#burger');

function setActive(tab, pushHash = true) {
  if (!panels.some(p => p.dataset.panel === tab)) return;

  navLinks.forEach(btn => {
    const on = btn.dataset.tab === tab;
    btn.classList.toggle('active', on);
    on ? btn.setAttribute('aria-current', 'page') : btn.removeAttribute('aria-current');
  });

  panels.forEach(panel => {
    const on = panel.dataset.panel === tab;
    panel.classList.toggle('active', on);
    if (on) {
      panel.classList.add('enter');
      setTimeout(() => panel.classList.remove('enter'), 420);

      const reveals = $$('.reveal', panel);
      reveals.forEach(el => el.classList.remove('in'));
      requestAnimationFrame(() => requestAnimationFrame(() =>
        reveals.forEach(el => el.classList.add('in'))
      ));

      // Trigger counter animations for this panel
      triggerCounters(panel);
      // Trigger process bar animation
      triggerProcessBar(panel);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  closeMobileMenu();
  if (pushHash) history.pushState(null, '', '#' + tab);
}

function initFromHash() {
  const hash   = location.hash.replace('#', '') || 'home';
  const exists = panels.some(p => p.dataset.panel === hash);
  setActive(exists ? hash : 'home', false);
}

navLinks.forEach(btn => btn.addEventListener('click', () => setActive(btn.dataset.tab)));
brand?.addEventListener('click', () => setActive('home'));

$$('[data-tab]').forEach(el => {
  if (el.classList.contains('navlink') || el.classList.contains('brand')) return;
  el.addEventListener('click', e => { e.preventDefault(); setActive(el.dataset.tab); });
});

window.addEventListener('popstate', initFromHash);

/* ===== MOBILE MENU ===== */
function closeMobileMenu() {
  nav?.classList.remove('open');
  burger?.setAttribute('aria-expanded', 'false');
}

burger?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open.toString());
});

document.addEventListener('click', e => {
  if (nav?.classList.contains('open') && !nav.contains(e.target) && !burger?.contains(e.target))
    closeMobileMenu();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileMenu();
});

/* ===== SCROLL PROGRESS ===== */
const progressBar = $('#scrollProgress');
window.addEventListener('scroll', () => {
  if (!progressBar) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
}, { passive: true });

/* ===== CURSOR GLOW ===== */
const cursorGlow = $('#cursorGlow');
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  }, { passive: true });
}

/* ===== GLOW MOUSE-FOLLOW (cards) ===== */
function attachGlow(root = document) {
  $$('.glow', root).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--x', (e.clientX - r.left) + 'px');
      card.style.setProperty('--y', (e.clientY - r.top)  + 'px');
    }, { passive: true });
  });
}
attachGlow();

/* ===== 3D CARD TILT ===== */
const TILT_MAX = 7; // degrees
const tiltSelectors = '.tilt-card';

function addTilt(el) {
  el.addEventListener('mousemove', e => {
    const r   = el.getBoundingClientRect();
    const x   = ((e.clientX - r.left) / r.width)  - 0.5;
    const y   = ((e.clientY - r.top)  / r.height) - 0.5;
    el.style.transition = 'transform .1s ease';
    el.style.transform  = `perspective(900px) rotateX(${-y * TILT_MAX}deg) rotateY(${x * TILT_MAX}deg) translateZ(4px)`;
  }, { passive: true });

  el.addEventListener('mouseleave', () => {
    el.style.transition = 'transform .5s cubic-bezier(.22,.68,0,1.2)';
    el.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  });
}

$$(tiltSelectors).forEach(addTilt);

/* ===== MAGNETIC BUTTONS ===== */
const MAG_STRENGTH = 0.35;

$$('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * MAG_STRENGTH;
    const dy = (e.clientY - (r.top  + r.height / 2)) * MAG_STRENGTH;
    btn.style.transition = 'transform .15s ease';
    btn.style.transform  = `translate(${dx}px, ${dy}px)`;
  }, { passive: true });

  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform .4s cubic-bezier(.22,.68,0,1.2)';
    btn.style.transform  = 'translate(0,0)';
  });
});

/* ===== COUNTER ANIMATIONS ===== */
const countedEls = new Set();

function animateCount(el) {
  if (countedEls.has(el)) return;
  countedEls.add(el);

  const target   = parseFloat(el.dataset.target);
  const suffix   = el.dataset.suffix   || '';
  const prefix   = el.dataset.prefix   || '';
  const decimal  = el.dataset.decimal  === 'true';
  const duration = 1800;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = eased * target;

    if (decimal) {
      el.textContent = prefix + current.toFixed(1).replace('.', ',') + suffix;
    } else if (target >= 1000) {
      el.textContent = prefix + Math.floor(current).toLocaleString('fr-FR') + suffix;
    } else {
      el.textContent = prefix + Math.floor(current) + suffix;
    }

    if (progress < 1) requestAnimationFrame(step);
    else {
      if (decimal) el.textContent = prefix + target.toFixed(1).replace('.', ',') + suffix;
      else el.textContent = prefix + (target >= 1000 ? target.toLocaleString('fr-FR') : target) + suffix;
    }
  }

  requestAnimationFrame(step);
}

function triggerCounters(root = document) {
  $$('.count-up', root).forEach(el => {
    if (el.dataset.target) setTimeout(() => animateCount(el), 250);
  });
}

/* Observe counters that become visible via IntersectionObserver */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && e.target.dataset.target) animateCount(e.target);
  });
}, { threshold: .5 });

$$('.count-up').forEach(el => counterObserver.observe(el));

/* ===== PROCESS BAR SEQUENTIAL ANIMATION ===== */
function triggerProcessBar(root = document) {
  const steps = $$('#processBar .pStep', root);
  if (!steps.length) return;

  // Reset
  steps.forEach(s => s.classList.remove('visible'));

  steps.forEach((step, i) => {
    setTimeout(() => step.classList.add('visible'), 150 + i * 120);
  });
}

// Also observe when the process bar scrolls into view
const processObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      triggerProcessBar(e.target.closest('.panel') || document);
      processObserver.unobserve(e.target);
    }
  });
}, { threshold: .3 });

const processBarEl = $('#processBar');
if (processBarEl) processObserver.observe(processBarEl);

/* ===== FAQ ACCORDION ===== */
$$('.faqItem').forEach(item => {
  const btn    = $('.faqQ', item);
  const answer = $('.faqA', item);
  if (!btn || !answer) return;

  answer.style.maxHeight = '0px';

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    $$('.faqItem.open').forEach(i => {
      i.classList.remove('open');
      $('.faqQ', i)?.setAttribute('aria-expanded', 'false');
      const a = $('.faqA', i);
      if (a) a.style.maxHeight = '0px';
    });

    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

/* ===== COPY EMAIL ===== */
const copyBtn   = $('#copyEmail');
const copyLabel = $('#copyLabel');
const toast     = $('#toast');
const EMAIL     = 'luludavril12@gmail.com';

copyBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
  } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: EMAIL });
    Object.assign(ta.style, { position: 'fixed', opacity: '0' });
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); } catch {}
    ta.remove();
  }

  if (copyLabel) copyLabel.textContent = 'Copié !';
  if (toast)     toast.classList.add('show');

  setTimeout(() => {
    if (copyLabel) copyLabel.textContent = 'Copier';
    if (toast)     toast.classList.remove('show');
  }, 1600);
});

/* ===== IMAGE FALLBACK ===== */
$$('.influCard img, .postImgWrap img').forEach(img => {
  img.addEventListener('error', () => {
    const wrap = img.closest('.influCard') || img.closest('.postImgWrap');
    if (!wrap) return;
    img.remove();
    wrap.classList.add('no-img');
    const ph = Object.assign(document.createElement('span'), {
      textContent: '📷',
      className: 'influPlaceholder'
    });
    ph.setAttribute('aria-hidden', 'true');
    wrap.appendChild(ph);
  });
});

/* ===== INIT ===== */
initFromHash();

// Trigger reveals + counters on initial panel
requestAnimationFrame(() => {
  const active = $('.panel.active');
  if (!active) return;
  $$('.reveal', active).forEach(el => el.classList.add('in'));
  triggerCounters(active);
  triggerProcessBar(active);
});
