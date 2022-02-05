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

function displayTemperature(response) {
    let city = document.querySelector("#city");
    let mainTemperature = document.querySelector("#main-temperature");
    let weatherCondition = document.querySelector("#conditions");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let date = document.querySelector("#date");

    city.innerHTML = response.data.name;
    mainTemperature.innerHTML = Math.round(response.data.main.temp);
    weatherCondition.innerHTML = response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);
    date.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "f8dd335d654ee5ed88dd8c0c8485e037";
let city = "Berlin"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature)