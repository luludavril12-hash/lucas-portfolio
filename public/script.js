"use strict";

// ===== DOM =====
const navLinks  = Array.from(document.querySelectorAll(".navlink"));
const panels    = Array.from(document.querySelectorAll(".panel"));
const brand     = document.querySelector(".brand");
const nav       = document.getElementById("mainNav");
const burger    = document.getElementById("burger");
const yearEl    = document.getElementById("year");

if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Tabs =====
function setActive(tab, pushHash = true) {
  if (!panels.some(p => p.dataset.panel === tab)) return;

  navLinks.forEach(btn => {
    const on = btn.dataset.tab === tab;
    btn.classList.toggle("active", on);
    on ? btn.setAttribute("aria-current", "page") : btn.removeAttribute("aria-current");
  });

  panels.forEach(panel => {
    const on = panel.dataset.panel === tab;
    panel.classList.toggle("active", on);
    if (on) {
      panel.classList.add("enter");
      setTimeout(() => panel.classList.remove("enter"), 400);
      const reveals = panel.querySelectorAll(".reveal");
      reveals.forEach(el => el.classList.remove("in"));
      requestAnimationFrame(() => requestAnimationFrame(() => reveals.forEach(el => el.classList.add("in"))));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  closeMobileMenu();
  if (pushHash) history.pushState(null, "", "#" + tab);
}

function initFromHash() {
  const hash   = location.hash.replace("#", "") || "home";
  const exists = panels.some(p => p.dataset.panel === hash);
  setActive(exists ? hash : "home", false);
}

navLinks.forEach(btn => btn.addEventListener("click", () => setActive(btn.dataset.tab)));
brand?.addEventListener("click", () => setActive("home"));

document.querySelectorAll("[data-tab]").forEach(el => {
  if (el.classList.contains("navlink") || el.classList.contains("brand")) return;
  el.addEventListener("click", e => { e.preventDefault(); setActive(el.dataset.tab); });
});

window.addEventListener("popstate", initFromHash);

// ===== Mobile menu =====
function closeMobileMenu() {
  nav?.classList.remove("open");
  burger?.setAttribute("aria-expanded", "false");
}

burger?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});

document.addEventListener("click", e => {
  if (nav?.classList.contains("open") && !nav.contains(e.target) && !burger?.contains(e.target)) closeMobileMenu();
});

document.addEventListener("keydown", e => { if (e.key === "Escape") closeMobileMenu(); });

// ===== Glow mouse-follow =====
document.querySelectorAll(".glow").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--x", (e.clientX - r.left) + "px");
    card.style.setProperty("--y", (e.clientY - r.top)  + "px");
  });
});

// ===== FAQ accordion =====
Array.from(document.querySelectorAll(".faqItem")).forEach(item => {
  const btn    = item.querySelector(".faqQ");
  const answer = item.querySelector(".faqA");
  if (!btn || !answer) return;

  answer.style.maxHeight = "0px";

  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faqItem.open").forEach(i => {
      i.classList.remove("open");
      i.querySelector(".faqQ")?.setAttribute("aria-expanded", "false");
      const a = i.querySelector(".faqA");
      if (a) a.style.maxHeight = "0px";
    });
    if (!isOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// ===== Copy email =====
const copyBtn   = document.getElementById("copyEmail");
const copyLabel = document.getElementById("copyLabel");
const toast     = document.getElementById("toast");
const EMAIL     = "luludavril12@gmail.com";

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
  } catch {
    const ta = Object.assign(document.createElement("textarea"), { value: EMAIL });
    Object.assign(ta.style, { position: "fixed", opacity: "0" });
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand("copy"); } catch {}
    ta.remove();
  }
  if (copyLabel) copyLabel.textContent = "Copié !";
  if (toast)     toast.classList.add("show");
  setTimeout(() => {
    if (copyLabel) copyLabel.textContent = "Copier";
    if (toast)     toast.classList.remove("show");
  }, 1500);
});

// ===== Image fallback (influence gallery + post cards) =====
document.querySelectorAll(".influCard img, .postImgWrap img").forEach(img => {
  img.addEventListener("error", () => {
    const wrap = img.closest(".influCard") || img.closest(".postImgWrap");
    if (!wrap) return;
    img.remove();
    wrap.classList.add("no-img");
    const ph = document.createElement("span");
    ph.textContent = "📷"; ph.setAttribute("aria-hidden", "true");
    ph.className = "influPlaceholder";
    wrap.appendChild(ph);
  });
});

// ===== Init =====
initFromHash();
requestAnimationFrame(() => {
  const active = document.querySelector(".panel.active");
  if (active) active.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
});
