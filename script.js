// let weather = {
//    paris: {
//       temp: 19.7,
//       humidity: 80,
//    },
//    tokyo: {
//       temp: 17.3,
//       humidity: 50,
//    },
//    lisbon: {
//       temp: 30.2,
//       humidity: 20,
//    },
//    "san francisco": {
//       temp: 20.9,
//       humidity: 100,
//    },
//    "new york": {
//       temp: 15,
//       humidity: 20,
//    },
// };

// let city = prompt("Enter a city");
// city = city.toLowerCase();
// if (weather[city] !== undefined) {
//    let temperature = weather[city].temp;
//    let humidity = weather[city].humidity;
//    let celsTemp = Math.round(temperature);
//    let farenhTemp = Math.round((temperature * 9) / 5 + 32);

//    alert(
//       `It is currently ${celsTemp}°C (${farenhTemp}°F) in ${city} with a humidity of ${humidity}%`
//    );
// } else {
//    alert(
//       `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//    );
// }

//date
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

//city
function search(event) {
   event.preventDefault();
   let searchInput = document.querySelector("#search-input");
   let city = document.querySelector("#city");
   city.innerHTML = searchInput.value;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
