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

//weather data
function showWeather(response) {
   document.querySelector("#city").innerHTML = response.data.name;
   document.querySelector("#degree").innerHTML = Math.round(
      response.data.main.temp
   );
   document.querySelector("#humidity").innerHTML = response.data.main.humidity;
   document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
   );
   document.querySelector("#weather-descr").innerHTML =
      response.data.weather[0].main;
   document
      .querySelector(".weather-icon")
      .setAttribute("src", `icons/${response.data.weather[0].icon}@2x.svg`);
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

searchCity("New York");
