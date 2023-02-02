//Importing functions from dateAndTime, temperature, weatherForecast, browserDefault script files
import { temperatureCity } from "./temperature.js";
import { browserDefault } from "./browserDefault.js";
import { cityData } from "./dateAndTime.js";

//Declaration of global variables
let jsonKeys = [];
var formValue = [];
var str = "";
let formOption = document.getElementById("city-names");
var cityName = "";
export var cityArray = formValue;

//Getting the input from the user
var getValue = document.getElementById("city-name-background");

//Declaring City Array based on the Json file
export function cityArrayFunction() {
  jsonKeys = Object.keys(cityData);
  return jsonKeys;
}
cityArrayFunction();

//Sorting the cities
for (let i = 0; i < jsonKeys.length; i++) {
  formValue[i] = cityData[jsonKeys[i]].cityName;
}
formValue.sort();

//Assigning the values to the option
for (var i = 0; i < formValue.length; ++i) {
  str += '<option value="' + formValue[i] + '" />';
}
formOption.innerHTML = str;

//Anonymous function
var updateTopPortion = async function () {
  //Statements for handling the input given if it is available in the list
  if (cityArray.includes(getValue.value)) {
    console.log("The selected city is " + getValue.value);
    let cityDispName = getValue.value.toLowerCase();
    cityName = cityDispName.split(" ").join("");
    let iconPath = "/Assets/HTML_CSS/Icons_for_cities/" + cityName + ".svg";
    let cityIcon = document.getElementsByClassName("city-icon")[0];
    cityIcon.src = iconPath;
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
  }
  //Statements for handling the input given if it is not available in the list
  else {
    console.log("You have selected the wrong city. Select the correct city");
    document.getElementsByClassName("error")[0].innerHTML =
      "Enter the correct city";
    let iconPath = "/Assets/HTML_CSS/General_Images_Icons/warning.svg";
    let cityIcon = document.getElementsByClassName("city-icon")[0];
    cityIcon.src = iconPath;
    document.getElementsByClassName("date")[0].innerHTML = "";
    document.getElementsByClassName("temperature-c")[0].innerHTML = "NIL";
    document.getElementsByClassName("temperature-f")[0].innerHTML = "NIL";
    document.getElementsByClassName("humidvalue")[0].innerHTML = "NIL";
    document.getElementsByClassName("preciptvalue")[0].innerHTML = "NIL";
    document.getElementsByClassName("hrs-mins")[0].innerHTML = "NIL";
    document.getElementsByClassName("seconds")[0].innerHTML = "";
    document.getElementsByClassName("time-icon")[0].src =
      "/Assets/HTML_CSS/General_Images_Icons/warning.svg";
    errorTimeDisplay("NIL");
    for (let i = 1; i < 7; i++) {
      let className = "image--" + [i];
      document.getElementsByClassName(className)[0].src =
        "/Assets/HTML_CSS/Weather_Icons/sunnyIcon.svg";
    }
  }
};

//Eventlisteners for handling the events during the change of value - Get the user input
getValue.addEventListener("change", function () {
  updateTopPortion();
});

//Eventlistener for preventing the page from auto reload
getValue.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    event.preventDefault();
  }
});

//Function for returning NIL values for incorrect city names
function errorTimeDisplay(value) {
  let items = document.querySelectorAll(".item");
  items.forEach((element) => {
    element.innerHTML = value;
  });
  let numbers = document.querySelectorAll(".number");
  numbers.forEach((element) => {
    element.innerHTML = "-";
  });
}
