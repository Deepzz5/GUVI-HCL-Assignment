async function getWeather() {

    let city = document.getElementById("cityInput").value;

    if (city == "") {
        document.getElementById("error").innerText =
            "Please enter a city name";
        return;
    }

    try {
        document.getElementById("error").innerText = "";

        // Get city location
        let locationResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            city +
            "&count=1&language=en&format=json"
        );

        let locationData = await locationResponse.json();

        if (!locationData.results) {
            document.getElementById("error").innerText =
                "City not found";
            return;
        }

        let latitude = locationData.results[0].latitude;
        let longitude = locationData.results[0].longitude;
        let cityName = locationData.results[0].name;

        // Get weather data
        let weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            latitude +
            "&longitude=" +
            longitude +
            "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code"
        );

        let weatherData = await weatherResponse.json();

        let current = weatherData.current;

        document.getElementById("cityName").innerText = cityName;

        document.getElementById("temperature").innerText =
            "Temperature: " + current.temperature_2m + " °C";

        document.getElementById("humidity").innerText =
            "Humidity: " + current.relative_humidity_2m + "%";

        document.getElementById("wind").innerText =
            "Wind Speed: " + current.wind_speed_10m + " km/h";

        document.getElementById("condition").innerText =
            "Weather Code: " + current.weather_code;

    } catch (error) {
        document.getElementById("error").innerText =
            "Something went wrong. Please try again.";
    }
}