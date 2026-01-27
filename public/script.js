// ===== Tabs navigation =====
const navLinks = Array.from(document.querySelectorAll(".navlink"));
const panels = Array.from(document.querySelectorAll(".panel"));
const brand = document.querySelector(".brand");
const nav = document.querySelector(".nav");
const burger = document.querySelector(".burger");

const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

function setActive(tab, pushHash = true) {
  navLinks.forEach(b => {
    const active = b.dataset.tab === tab;
    b.classList.toggle("active", active);
    if (active) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });

  panels.forEach(p => {
    const active = p.dataset.panel === tab;
    p.classList.toggle("active", active);
    if (active) {
      p.classList.add("enter");

      // reveal animation reset
      requestAnimationFrame(() => {
        p.querySelectorAll(".reveal").forEach(el => el.classList.remove("in"));
        requestAnimationFrame(() => {
          p.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
        });
      });

      setTimeout(() => p.classList.remove("enter"), 420);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // close mobile menu
  nav.classList.remove("open");
  burger?.setAttribute("aria-expanded", "false");

  if (pushHash) window.location.hash = tab;
}

function initFromHash() {
  const hash = (window.location.hash || "#home").replace("#", "");
  const exists = panels.some(p => p.dataset.panel === hash);
  setActive(exists ? hash : "home", false);
}

navLinks.forEach(btn => btn.addEventListener("click", () => setActive(btn.dataset.tab)));

brand.addEventListener("click", (e) => {
  e.preventDefault();
  setActive("home");
});

document.querySelectorAll("[data-tab]").forEach(el => {
  if (el.classList.contains("navlink") || el.classList.contains("brand")) return;
  el.addEventListener("click", (e) => {
    e.preventDefault();
    setActive(el.dataset.tab);
  });
});

// burger menu
burger?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});

window.addEventListener("hashchange", initFromHash);
initFromHash();

// ===== Glow follow mouse =====
document.querySelectorAll(".glow").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", (e.clientX - rect.left) + "px");
    card.style.setProperty("--y", (e.clientY - rect.top) + "px");
  });
});

// ===== FAQ accordion =====
const faqItems = Array.from(document.querySelectorAll(".faqItem"));
faqItems.forEach(item => {
  const btn = item.querySelector(".faqQ");
  const panel = item.querySelector(".faqA");

  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    // close all (premium feel)
    faqItems.forEach(i => {
      i.classList.remove("open");
      i.querySelector(".faqQ")?.setAttribute("aria-expanded", "false");
      i.querySelector(".faqA").style.maxHeight = "0px";
    });

    if (!isOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

// ===== Contact: copy email + toast =====
const copyBtn = document.getElementById("copyEmail");
const toast = document.getElementById("toast");
const email = "luludavril12@gmail.com";

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1100);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = email;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1100);
  }
});
