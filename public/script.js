/* ============================================================
   Lucas Davril — Portfolio
   script.js · Final version
   ============================================================ */

"use strict";

// ===== DOM refs =====
const navLinks  = Array.from(document.querySelectorAll(".navlink"));
const panels    = Array.from(document.querySelectorAll(".panel"));
const brand     = document.querySelector(".brand");
const nav       = document.getElementById("mainNav");
const burger    = document.getElementById("burger");
const yearEl    = document.getElementById("year");

// ===== Year =====
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Tab system =====
function setActive(tab, pushHash = true) {
  if (!panels.some(p => p.dataset.panel === tab)) return;

  navLinks.forEach(btn => {
    const active = btn.dataset.tab === tab;
    btn.classList.toggle("active", active);
    active ? btn.setAttribute("aria-current", "page") : btn.removeAttribute("aria-current");
  });

  panels.forEach(panel => {
    const active = panel.dataset.panel === tab;
    panel.classList.toggle("active", active);

    if (active) {
      panel.classList.add("enter");
      setTimeout(() => panel.classList.remove("enter"), 400);

      // Trigger reveal animations
      const reveals = panel.querySelectorAll(".reveal");
      reveals.forEach(el => el.classList.remove("in"));

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          reveals.forEach(el => el.classList.add("in"));
        });
      });

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

// ===== Nav click handlers =====
navLinks.forEach(btn => btn.addEventListener("click", () => setActive(btn.dataset.tab)));

brand?.addEventListener("click", () => setActive("home"));

// All [data-tab] elements (CTAs, buttons in content)
document.querySelectorAll("[data-tab]").forEach(el => {
  if (el.classList.contains("navlink") || el.classList.contains("brand")) return;
  el.addEventListener("click", e => {
    e.preventDefault();
    setActive(el.dataset.tab);
  });
});

// Hash-based routing (browser back/forward)
window.addEventListener("popstate", initFromHash);

// ===== Mobile menu =====
function closeMobileMenu() {
  nav?.classList.remove("open");
  burger?.setAttribute("aria-expanded", "false");
}

burger?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// Close on outside click
document.addEventListener("click", e => {
  if (
    nav?.classList.contains("open") &&
    !nav.contains(e.target) &&
    !burger?.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

// Close on Escape
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeMobileMenu();
});

// ===== Glow: mouse-follow effect =====
function attachGlow(root = document) {
  root.querySelectorAll(".glow").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", (e.clientX - rect.left) + "px");
      card.style.setProperty("--y", (e.clientY - rect.top)  + "px");
    });
  });
}
attachGlow();

// ===== FAQ accordion =====
const faqItems = Array.from(document.querySelectorAll(".faqItem"));

faqItems.forEach(item => {
  const btn    = item.querySelector(".faqQ");
  const answer = item.querySelector(".faqA");
  if (!btn || !answer) return;

  // Remove hidden attr to allow maxHeight animation
  answer.removeAttribute("hidden");
  answer.style.maxHeight = "0px";

  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    // Close all
    faqItems.forEach(i => {
      i.classList.remove("open");
      i.querySelector(".faqQ")?.setAttribute("aria-expanded", "false");
      const a = i.querySelector(".faqA");
      if (a) a.style.maxHeight = "0px";
    });

    // Open clicked one (if it was closed)
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
    // Fallback for Safari / HTTP
    const ta = document.createElement("textarea");
    Object.assign(ta.style, { position: "fixed", opacity: "0", pointerEvents: "none" });
    ta.value = EMAIL;
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand("copy"); } catch {}
    ta.remove();
  }

  // Feedback
  if (copyLabel) copyLabel.textContent = "Copié !";
  if (toast)     toast.classList.add("show");

  setTimeout(() => {
    if (copyLabel) copyLabel.textContent = "Copier";
    if (toast)     toast.classList.remove("show");
  }, 1500);
});

// ===== Image fallback (influence gallery) =====
document.querySelectorAll(".influCard img").forEach(img => {
  img.addEventListener("error", () => {
    const card = img.closest(".influCard");
    if (!card) return;
    img.remove();
    card.classList.add("no-img");
    const placeholder = document.createElement("span");
    placeholder.className = "influPlaceholder";
    placeholder.textContent = "📷";
    placeholder.setAttribute("aria-hidden", "true");
    card.insertBefore(placeholder, card.querySelector(".influCap"));
  });
});

// ===== Init =====
initFromHash();

// Trigger reveals on the initial active panel immediately
requestAnimationFrame(() => {
  const active = document.querySelector(".panel.active");
  if (active) {
    active.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
  }
});
