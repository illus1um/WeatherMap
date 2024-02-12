mapboxgl.accessToken = "pk.eyJ1IjoiaWxsdXMxdmUiLCJhIjoiY2xybHZ3aGtsMHU2YzJqb2M2ZmdoMm9zaSJ9.kP-WQ0DEvEtwryhKGshCtw";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v11",
  center: [0, 0],
  zoom: 2,
});

const popup = new mapboxgl.Popup({ closeOnClick: false });

document.getElementById("weatherForm").addEventListener("submit", async function (event) {
    event.preventDefault(); 
    const formData = new FormData(this);
    const cityName = formData.get("city");

    const response = await fetch("/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ city: cityName }),
    });

    const data = await response.json();

    map.flyTo({
      center: data.coordinates,
      zoom: 3,
    });

    const timezoneData = data.timezoneData;
    const currentTime = new Date(data.weatherData.dt * 1000 + timezoneData.gmtOffset * 1000 - (3 * 60 * 60 * 1000) * 2);

    popup.setLngLat(data.coordinates).setHTML(
        `<h1>${cityName}</h1><p>Temperature: ${data.weatherData.main.temp}°C</p>
          <img src="${data.weatherIconUrl}" alt="Weather Icon">
          <p>Timezone: ${timezoneData.zoneName}</p>
          <p>Current Time: ${currentTime.toLocaleTimeString()}</p>`
      ).addTo(map);

    const weatherInfo = document.getElementById("weather-info");

    weatherInfo.innerHTML = `<h2>Weather in ${cityName}</h2>
          <p>Temperature: ${data.weatherData.main.temp}°C (Feels like: ${data.weatherData.main.feels_like}°C)</p>
          <img src="${data.weatherIconUrl}" alt="Weather Icon">
          <p>Humidity: ${data.weatherData.main.humidity}%</p>
          <p>Pressure: ${data.weatherData.main.pressure} hPa</p>
          <p>Wind Speed: ${data.weatherData.wind.speed} m/s</p>
          <p>Country Code: ${data.weatherData.sys.country}</p>`;
});

