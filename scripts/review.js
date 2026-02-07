const countElement = document.querySelector("#reviewCount");
const storedCount = Number(localStorage.getItem("reviewCount"));
const nextCount = Number.isNaN(storedCount) ? 1 : storedCount + 1;

localStorage.setItem("reviewCount", String(nextCount));

if (countElement) {
  countElement.textContent = String(nextCount);
}
