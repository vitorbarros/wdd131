// scripts/filtered-temples.js

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/320x200/salt-lake-temple-37762.jpg",
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/320x200/sao-paulo-brazil-temple-lds-187030-wallpaper.jpg",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40000,
    imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/320x200/1-Rome-Temple-2160936.jpg",
  },
];


const yearEl = document.querySelector("#currentyear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.querySelector("#lastModified");
if (lastModEl) lastModEl.textContent = document.lastModified;

const toggleBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-menu");

const cardGrid = document.querySelector(".album");
const pageTitle = document.querySelector("main h1");

const getDedicatedYear = (temple) => {
  const match = temple.dedicated.match(/\d{4}/);
  return match ? Number(match[0]) : NaN;
};

const createTempleCard = (temple) => {
  const card = document.createElement("figure");
  card.className = "temple-card";

  const img = document.createElement("img");
  img.src = temple.imageUrl;
  img.alt = temple.templeName;
  img.loading = "lazy";
  img.width = 400;
  img.height = 250;

  const body = document.createElement("figcaption");
  body.className = "temple-card-body";

  const title = document.createElement("h2");
  title.textContent = temple.templeName;

  const location = document.createElement("p");
  location.innerHTML = `<span>Location:</span> ${temple.location}`;

  const dedicated = document.createElement("p");
  dedicated.innerHTML = `<span>Dedicated:</span> ${temple.dedicated}`;

  const area = document.createElement("p");
  area.innerHTML = `<span>Area:</span> ${temple.area.toLocaleString()} sq ft`;

  body.append(title, location, dedicated, area);
  card.append(img, body);
  return card;
};

const displayTemples = (templeList) => {
  if (!cardGrid) return;
  cardGrid.innerHTML = "";
  templeList.forEach((temple) => cardGrid.append(createTempleCard(temple)));
};

const filterTemples = (filter) => {
  let filtered = temples;

  if (filter === "old") {
    filtered = temples.filter((temple) => getDedicatedYear(temple) < 1900);
  } else if (filter === "new") {
    filtered = temples.filter((temple) => getDedicatedYear(temple) > 2000);
  } else if (filter === "large") {
    filtered = temples.filter((temple) => temple.area > 90000);
  } else if (filter === "small") {
    filtered = temples.filter((temple) => temple.area < 10000);
  }

  displayTemples(filtered);
};

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

  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") setExpanded(false);
  });
}

const navLinks = document.querySelectorAll(".nav-menu a[data-filter]");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const filter = link.dataset.filter;
    const label = link.textContent.trim() || "Home";
    if (pageTitle) pageTitle.textContent = label;
    filterTemples(filter);

    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

displayTemples(temples);

const homeLink = document.querySelector(".nav-menu a[data-filter=\"home\"]");
if (homeLink) homeLink.classList.add("active");
