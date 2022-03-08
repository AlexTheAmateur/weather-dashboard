// import { get } from "jquery";

var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityName");
var historyEl = document.querySelector("#history");
var cityContainerEl = document.querySelector("#cityContainer");
var forecastContainerEl = document.querySelector("#forecastContainer");
var count = 0;

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();

  if (cityName) {
    var historyBtn = document.createElement("button");
    historyBtn.classList = "button";
    historyBtn.innerHTML = cityInputEl.value;
    historyBtn.setAttribute(
      "onclick",
      `historyLookup("${historyBtn.innerHTML}")`
    );
    historyEl.appendChild(historyBtn);
    cityInputEl.value = "";
    getCity(cityName);
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
            cleardata(cityContainerEl);
            getCityInfo(data[0].lat, data[0].lon, data[0].name);
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

var getCityInfo = function (lat, lon, name) {
  var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&limit=5&appid=1105aa7fa9c3585e4744c7099b34f8f6`;
  fetch(weatherURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          cleardata(forecastContainerEl);
          var forecastTitle = document.createElement("h3");
          forecastTitle.setAttribute("id", "forecastTitle");
          forecastTitle.innerHTML = "5-Day Forecast";
          forecastContainerEl.appendChild(forecastTitle);

          var now = new Date(data.current.dt * 1000).toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            // hour: "2-digit",
            // minute: "2-digit",
          });
          var cityDateWeather = document.createElement("h2");
          cityDateWeather.innerHTML = `${name} (${now})`;
          cityContainerEl.appendChild(cityDateWeather);
          var icon = data.current.weather[0].icon;
          //   cityDateWeather.setAttribute(
          //     "src",
          //
          //   );
          for (let i = 0; i < 6; i++) {
            var tomorrow = new Date(data.daily[i].dt * 1000).toLocaleString(
              "en-US",
              {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                // hour: "2-digit",
                // minute: "2-digit",
              }
            );
            var date = document.createElement("h5");
            var wicon = document.createElement("img");
            var icon = data.daily[i].weather[0].icon;
            var list = document.createElement("div");
            var cityTemp = document.createElement("p");
            var cityWind = document.createElement("p");
            var cityHumidity = document.createElement("p");
            list.classList = "list";
            date.textContent = tomorrow;
            wicon.setAttribute(
              "src",
              "https://openweathermap.org/img/w/" + icon + ".png"
            );
            cityTemp.textContent = "Temp: " + data.daily[i].temp.day + "\xB0F";
            cityWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
            cityHumidity.textContent =
              "Humidity: " + data.daily[i].humidity + "%";

            if (i === 0) {
              var cityUV = document.createElement("p");
              cityUV.textContent = "UV: " + data.current.uvi;
              if (data.current.uvi <= 2) {
                cityUV.setAttribute("id", "UVG");
              } else if (data.current.uvi <= 4) {
                cityUV.setAttribute("id", "UVG");
              } else {
                cityUV.classList = "UVS";
              }

              cityContainerEl.appendChild(wicon);
              cityContainerEl.appendChild(cityTemp);
              cityContainerEl.appendChild(cityWind);
              cityContainerEl.appendChild(cityHumidity);
              cityContainerEl.appendChild(cityUV);
            } else {
              list.appendChild(date);
              list.appendChild(wicon);
              list.appendChild(cityTemp);
              list.appendChild(cityWind);
              list.appendChild(cityHumidity);
              forecastContainerEl.appendChild(list);
            }
          }
          //   var cityToday = document.querySelector("#cityToday");
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather. - " + error);
    });
};

var cleardata = function (element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
};

var historyLookup = function (cityName) {
  getCity(cityName);
};

cityFormEl.addEventListener("submit", formSubmitHandler);
