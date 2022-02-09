function formatDate (timestamp) {
    let date = new Date(timestamp);
    let day = date.getDate();
    let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = monthName[date.getMonth()];
    let weekDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekDay = weekDayName[date.getDay()];
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${weekDay}, ${day}. ${month} | ${hours}:${minutes}`
}

function formatDay (timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    let day = days[date.getDay()];
    return day;
}

function displayForecast(response) {
    let forecastData = response.data.daily;
    let forecast = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecastData.forEach(function(forecastDay, index) {
    if (index < 5) {
    forecastHTML = forecastHTML + `
    <div class="col-2 forecast-elements">
        <div class="date">${formatDay(forecastDay.dt)}</div>
        <div><img class="forecast-icon" src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"></div>
        <div class="forecast-temperature">
            <span class="maximum-forecast-temperature">${Math.round(forecastDay.temp.max)}°</span> 
            <span class="minimum-forecast-temperature">${Math.round(forecastDay.temp.min)}°</span>
            </div>
        </div>`
    }}
    );

    forecastHTML = forecastHTML + `</div>`
    forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "f8dd335d654ee5ed88dd8c0c8485e037";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    let city = document.querySelector("#city");
    let mainTemperature = document.querySelector("#main-temperature");
    let weatherCondition = document.querySelector("#conditions");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let date = document.querySelector("#date");
    let weatherIcon = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    city.innerHTML = response.data.name;
    mainTemperature.innerHTML = Math.round(response.data.main.temp);
    weatherCondition.innerHTML = response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    date.innerHTML = formatDate(response.data.dt * 1000);
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    getForecast(response.data.coord);    
}

function search(city) {
    let apiKey = "f8dd335d654ee5ed88dd8c0c8485e037";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemperature)
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

function getCurrentCoordinates(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "f8dd335d654ee5ed88dd8c0c8485e037";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature);
  }

function triggerNavigator() {
    navigator.geolocation.getCurrentPosition(getCurrentCoordinates);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit)

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", triggerNavigator);

search("Berlin");
displayForecast();