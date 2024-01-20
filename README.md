# Weather App

This web application allows users to get real-time weather information and timezone details for a selected city. It utilizes the Mapbox API for geocoding and mapping and the OpenWeather API for weather data. Additionally, the TimezoneDB API is integrated to provide information about the timezone of the selected location.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Detailed information about used API's](#api-keys)
- [Design Decisions](#design-decisions)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/illus1um/WeatherMap.git
   
2. Install dependencies:

   ```bash
    npm install

3. Start the server:

    ```bash
    npm start

4. Open your browser and visit
    ```bash
    http://localhost:3000.

  ## Usage
Enter the name of the city in the input field at the top-right.

Submit the form to view weather information for the selected city.

The map will zoom in to the selected city, and a popup will display detailed weather information.

The weather information includes temperature, feels-like temperature, humidity, pressure, wind speed, country code and timezone details.

  ## Detailed information about used API's
1. Mapbox API
Purpose: Mapbox API is used for geocoding (converting location names into geographic coordinates) and rendering interactive maps on the web.

Documentation: [Mapbox API Documentation](https://docs.mapbox.com/)

2. OpenWeather API
Purpose: OpenWeather API provides real-time weather data, including current conditions, forecasts, and historical data.

Documentation: [OpenWeather API Documentation](https://openweathermap.org/api)

3. TimezoneDB API
Purpose: TimezoneDB API is used to retrieve information about the timezone of a specific location based on its geographic coordinates.

Documentation: [TimezoneDB API Documentation](https://timezonedb.com/api)

  ## Design Decisions
Frontend Framework: The project uses Mapbox GL JS for mapping and vanilla JavaScript for the frontend.

Styling: The dark theme is chosen to complement the map. Styles are defined in the public/styles.css file.

Structure: The project follows a modular structure with separate services for Mapbox, OpenWeather, and TimezoneDB.

Additional API: TimezoneDB API is integrated to provide timezone information for the selected location.
