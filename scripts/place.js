const yearSpan = document.querySelector("#currentyear");
const lastModSpan = document.querySelector("#lastModified");

if (yearSpan) yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = document.lastModified;

const temperature = 6; // Celsius
const windSpeed = 15; // km/h

const tempSpan = document.querySelector("#temperature");
const windSpan = document.querySelector("#windspeed");
const chillSpan = document.querySelector("#windchill");

if (tempSpan) tempSpan.textContent = temperature;
if (windSpan) windSpan.textContent = windSpeed;

const calculateWindChill = (tempC, speedKmh) =>
  13.12 + 0.6215 * tempC - 11.37 * speedKmh ** 0.16 + 0.3965 * tempC * speedKmh ** 0.16;

let chillText = "N/A";
if (temperature <= 10 && windSpeed > 4.8) {
  const chill = calculateWindChill(temperature, windSpeed);
  chillText = `${chill.toFixed(1)}°C`;
}

if (chillSpan) chillSpan.textContent = chillText;
