function displayTemperature(response) {
    let city = document.querySelector("#city");
    let mainTemperature = document.querySelector("#main-temperature");
    let weatherCondition = document.querySelector("#conditions");
    city.innerHTML = response.data.name;
    mainTemperature.innerHTML = Math.round(response.data.main.temp, 0);
    weatherCondition.innerHTML = response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);
}

let apiKey = "f8dd335d654ee5ed88dd8c0c8485e037";
let city = "Berlin"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature)