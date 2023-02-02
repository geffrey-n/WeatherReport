//Importing the class from temperature javascript
import { temperatureCity } from "./temperature.js";

//IIFE function for displaying the default cities content when the page is loaded
var getValue = document.getElementById("city-name-background");
export var browserDefault = (async function () {
  let cityName = "kolkata";
  let topSection = new temperatureCity(cityName);
  document.getElementsByClassName("date")[0].innerHTML =
    topSection.monthDisplay();
  document.getElementsByClassName("temperature-c")[0].innerHTML =
    topSection.temperatureCelsius();
  document.getElementsByClassName("temperature-f")[0].innerHTML =
    topSection.temperatureFarenheit();
  document.getElementsByClassName("humidvalue")[0].innerHTML =
    topSection.temperatureHumidity();
  document.getElementsByClassName("preciptvalue")[0].innerHTML =
    topSection.temperaturePrecipitation();
  let intervalCityTime = setInterval(
    topSection.timeDisplay.bind(topSection),
    1
  );
  let intervalForecastTime = setInterval(
    topSection.currentTime.bind(topSection),
    1
  );
  getValue.addEventListener("change", function () {
    clearInterval(intervalCityTime);
    clearInterval(intervalForecastTime);
  });
  await topSection.weatherIconForecast();
  document.getElementsByClassName("error")[0].innerHTML = "";
})();
