// import { get } from "jquery";

var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityName");
var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    getCity(cityName);

    // repoContainerEl.textContent = "";
    // nameInputEl.value = "";
  } else {
    alert("Enter a City");
  }
};

var getCity = function (cityName) {
  var requestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=1105aa7fa9c3585e4744c7099b34f8f6`;

  fetch(requestURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.length) {
            // Pull weather info using the latitude and longitude here
            getCityInfo(data[0].lat, data[0].lon);
          } else {
            alert("The city location is unknown: " + city);
          }
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather. - " + error);
    });
};

var getCityInfo = function (lat, lon) {
  var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&limit=5&appid=1105aa7fa9c3585e4744c7099b34f8f6`;
  fetch(weatherURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var now = new Date(data.current.dt * 1000).toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          console.log(now);
          console.log(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather. - " + error);
    });
};

cityFormEl.addEventListener("submit", formSubmitHandler);
