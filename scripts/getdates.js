const yearSpan = document.querySelector("#currentyear");
const lastModSpan = document.querySelector("#lastModified");

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = document.lastModified;
