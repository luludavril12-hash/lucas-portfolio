const navLinks = Array.from(document.querySelectorAll(".navlink"));
const panels = Array.from(document.querySelectorAll(".panel"));
const brand = document.querySelector(".brand");
const nav = document.querySelector(".nav");
const burger = document.querySelector(".burger");

const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

function setActive(tab, pushHash = true) {
  // buttons state
  navLinks.forEach(b => {
    const active = b.dataset.tab === tab;
    b.classList.toggle("active", active);
    if (active) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });

  // panels state
  panels.forEach(p => {
    const active = p.dataset.panel === tab;
    p.classList.toggle("active", active);
    if (active) {
      p.classList.add("enter");
      // reset + reveal animations
      requestAnimationFrame(() => {
        p.querySelectorAll(".reveal").forEach(el => el.classList.remove("in"));
        requestAnimationFrame(() => {
          p.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
        });
      });
      setTimeout(() => p.classList.remove("enter"), 420);
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

// click on nav buttons
navLinks.forEach(btn => {
  btn.addEventListener("click", () => setActive(btn.dataset.tab));
});

// brand click
brand.addEventListener("click", (e) => {
  e.preventDefault();
  setActive("home");
});

// any element with data-tab should switch tab
document.querySelectorAll("[data-tab]").forEach(el => {
  if (el.classList.contains("navlink") || el.classList.contains("brand")) return;
  el.addEventListener("click", (e) => {
    e.preventDefault();
    setActive(el.dataset.tab);
    // scroll to top for a clean feel
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// burger menu
burger?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});

// hash navigation
window.addEventListener("hashchange", initFromHash);
initFromHash();

// Contact: copy email + toast
const copyBtn = document.getElementById("copyEmail");
const toast = document.getElementById("toast");
const email = "luludavril12@gmail.com";

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1100);
  } catch {
    // fallback
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
