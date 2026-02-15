const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

const toggleMenu = () => {
  if (!siteNav || !menuToggle) return;
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", `${isOpen}`);
};

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMenu);
}

const yearSpan = document.querySelector("#currentyear");
const lastModSpan = document.querySelector("#lastModified");

if (yearSpan) yearSpan.textContent = `${new Date().getFullYear()}`;
if (lastModSpan) lastModSpan.textContent = `${document.lastModified}`;
