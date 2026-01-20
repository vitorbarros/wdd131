// scripts/temples.js

// Footer dates
const yearEl = document.querySelector("#currentyear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.querySelector("#lastModified");
if (lastModEl) lastModEl.textContent = document.lastModified;

// Mobile menu toggle
const toggleBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-menu");

if (toggleBtn && nav) {
  const setExpanded = (isOpen) => {
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    nav.classList.toggle("open", isOpen);
  };

  setExpanded(false);

  toggleBtn.addEventListener("click", () => {
    const isOpen = toggleBtn.getAttribute("aria-expanded") === "true";
    setExpanded(!isOpen);
  });

  // Close when a link is clicked (mobile)
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") setExpanded(false);
  });
}
