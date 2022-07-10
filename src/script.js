//current date
let today = new Date();
let currentDate = document.querySelector("#date");
let days = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
];
let hr = today.getHours();
if (hr < 10) {
   hr = `0${hr}`;
}
let min = today.getMinutes();
if (min < 10) {
   min = `0${min}`;
}
let day = days[today.getDay()];
date.innerHTML = `${day} ${hr}:${min}`;

//
function formatDay(timestamp) {
   let date = new Date(timestamp * 1000);
   let day = date.getDay();
   let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   return weekDays[day];
}

//weekly weather
function displayForecast(response) {
   let weekForecast = response.data.daily;

   let forecastElement = document.querySelector("#weekly-weather");
   let forecastHTML = "";

   weekForecast.forEach(function (forecastDay, index) {
      if (index < 6) {
         forecastHTML =
            forecastHTML +
            `
         <div class="col d-flex flex-column align-items-center week-day">
            <h3>${formatDay(forecastDay.dt)}</h3>
            <img
               class="weather-icon-next"
               src="icons/${forecastDay.weather[0].icon}@2x.svg"
               alt=""
            />
            <div class="weather-next">
               <span class="degree-max mb-0">${Math.round(
                  forecastDay.temp.max
               )}°</span>
               <span class="degree-min mb-0">${Math.round(
                  forecastDay.temp.min
               )}°</span>
            </div>
         </div>
         `;
      }
   });
   forecastElement.innerHTML = forecastHTML;
}

//weather data
function getCoordinates(coordinates) {
   let apiKey = "5166d6bfe55bc81ec2d7bb78b538650f";
   let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
   axios.get(apiURL).then(displayForecast);
}

function showWeather(response) {
   celsTemperature = response.data.main.temp;

   document.querySelector("#city").innerHTML = response.data.name;
   document.querySelector("#degree").innerHTML = Math.round(celsTemperature);
   document.querySelector("#humidity").innerHTML = response.data.main.humidity;
   document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
   );
   document.querySelector("#weather-descr").innerHTML =
      response.data.weather[0].main;
   document
      .querySelector(".weather-icon")
      .setAttribute("src", `icons/${response.data.weather[0].icon}@2x.svg`);

   getCoordinates(response.data.coord);
}

//search
function searchCity(city) {
   let apiKey = "5166d6bfe55bc81ec2d7bb78b538650f";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(showWeather);
}

function handleSearch(event) {
   event.preventDefault();
   let city = document.querySelector("#search-input").value;
   searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

//current city
function searchLocation(position) {
   let apiKey = "5166d6bfe55bc81ec2d7bb78b538650f";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
   axios.get(apiUrl).then(showWeather);
}
function getLocation(event) {
   event.preventDefault();
   navigator.geolocation.getCurrentPosition(searchLocation);
}
let locationButton = document.querySelector("#current-city");
locationButton.addEventListener("click", getLocation);

//unit conversion
function showFahrTemperature(event) {
   event.preventDefault();
   let tempUnit = document.querySelector("#degree");
   //remove the active class
   celsUnit.classList.remove("active");
   //add the active class
   fahrUnit.classList.add("active");
   let fahrTemperature = (celsTemperature * 9) / 5 + 32;
   tempUnit.innerHTML = Math.round(fahrTemperature);
}

function showCelsTemperature(event) {
   event.preventDefault();
   celsUnit.classList.add("active");
   fahrUnit.classList.remove("active");
   let tempUnit = document.querySelector("#degree");
   tempUnit.innerHTML = Math.round(celsTemperature);
}

let fahrUnit = document.querySelector("#fahr-unit");
fahrUnit.addEventListener("click", showFahrTemperature);

let celsUnit = document.querySelector("#cels-unit");
celsUnit.addEventListener("click", showCelsTemperature);

let celsTemperature = null;

searchCity("New York");
