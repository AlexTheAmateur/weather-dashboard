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
  var requestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=b7609117c1b58fc397022fe7414e5f44`;

  fetch(requestURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response.json());
        // return response.json();
      } else {
        alert("City not found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather. - " + error);
    });
};

cityFormEl.addEventListener("submit", formSubmitHandler);
