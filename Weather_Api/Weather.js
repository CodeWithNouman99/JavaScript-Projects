const searchInput = document.querySelector('#searchInput');
const form = document.querySelector("#searchForm");
const searchBtn = document.querySelector("#searchBtn");
const geoBtn = document.querySelector("#geoBtn");
const loader = document.querySelector("#loader");
const error = document.querySelector("#error");
const locationName = document.querySelector("#locationName");
const localTime = document.querySelector("#localTime");
const weatherIcon = document.querySelector("#weatherIcon");
const temp = document.querySelector("#temp");
const description = document.querySelector("#description");
const feels = document.querySelector("#feels");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const container = document.querySelector("#forecastContainer");
const template = document.querySelector("#forecastTemplate");

const API_KEY = "02012c70315bacc47fd643f978387c8a";

// Show / hide error
function showError(msg) {
  error.textContent = msg;
  error.hidden = false;
}

function clearError() {
  error.textContent = "";
  error.hidden = true;
}

// Loader
function showLoader() { loader.hidden = false; }
function hideLoader() { loader.hidden = true; }

// Clear forecast cards
function clearForecast() { container.innerHTML = ""; }

// Current weather API
async function getLocation(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error:", err);
    return null;
  }
}

// Forecast API
async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error:", err);
    return null;
  }
}

// Display 5-day forecast
function showForecast(forecastData) {
  clearForecast();
  const list = forecastData.list;
  const daily = list.filter(item => item.dt_txt.includes("12:00:00"));

  daily.forEach(item => {
    const card = template.content.cloneNode(true);
    const date = new Date(item.dt_txt);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });

    card.querySelector('.day').textContent = day;
    card.querySelector('.icon').src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    card.querySelector('.icon').alt = item.weather[0].description;
    card.querySelector('.temp-range').innerHTML = `${Math.round(item.main.temp_min)}° / ${Math.round(item.main.temp_max)}°`;

    container.appendChild(card);
  });
}

// Update current weather UI
function showCurrentWeather(data) {
  locationName.textContent = `${data.name}, ${data.sys.country}`;
  temp.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description;
  feels.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind: ${data.wind.speed} m/s`;

  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.alt = data.weather[0].description;
  weatherIcon.hidden = false;

  const now = new Date();
  localTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Search by city
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearError();

  const city = searchInput.value.trim();
  if (!city) {
    showError("Please enter the city...");
    return;
  }

  showLoader();
  const currentData = await getLocation(city);
  const forecastData = await getForecast(city);
  hideLoader();

  if (currentData && currentData.cod === 200) showCurrentWeather(currentData);
  else showError("City not found!");

  if (forecastData && forecastData.cod == "200") showForecast(forecastData);
});

// Geo-location
geoBtn.addEventListener("click", () => {
  clearError();
  if (navigator.geolocation) {
    showLoader();
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      const currentData = await fetch(currentUrl).then(res => res.json());
      const forecastData = await fetch(forecastUrl).then(res => res.json());
      hideLoader();

      if (currentData && currentData.cod === 200) showCurrentWeather(currentData);
      else showError("Unable to get current location weather.");

      if (forecastData && forecastData.cod == "200") showForecast(forecastData);
    }, () => {
      hideLoader();
      showError("Unable to get location.");
    });
  } else {
    showError("Geolocation is not supported in this browser");
  }
});
