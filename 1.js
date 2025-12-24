const apiKey = "967515fa312274b7c6e420d494580a2b";
const defaultCity = "Delhi";

window.onload = () => {
  fetchWeather(defaultCity);
};

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") return;
  fetchWeather(city);
}

function fetchWeather(city) {
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const card = document.getElementById("weatherCard");

  loading.classList.remove("hidden");
  error.classList.add("hidden");
  card.classList.add("hidden");

  fetch(
    `api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}`
  )
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      updateUI(data);
      loading.classList.add("hidden");
      card.classList.remove("hidden");
    })
    .catch(err => {
      loading.classList.add("hidden");
      error.textContent = "❌ City not found. Try again.";
      error.classList.remove("hidden");
    });
}

function updateUI(data) {
  document.getElementById("cityName").textContent =
    `${data.name}, ${data.sys.country}`;

  document.getElementById("temperature").textContent =
    `${Math.round(data.main.temp)}°C`;

  document.getElementById("condition").textContent =
    data.weather[0].description;

  document.getElementById("humidity").textContent =
    data.main.humidity;

  document.getElementById("wind").textContent =
    Math.round(data.wind.speed * 3.6);

  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.getElementById("dateTime").textContent =
    new Date().toLocaleString();
}
