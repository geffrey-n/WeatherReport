//Importing the class from dateAndTime javascript
import { dateTime } from "./dateAndTime.js";
import { cityData } from "./dateAndTime.js";
import { getNxtFiveHrs } from "../API/Data.js";

//Declaration of global variables for fetching user input
var getValue = document.getElementById("city-name-background");

//Declaration of subclass with constructor and methods
export class weatherForecast extends dateTime {
  constructor(cityValue) {
    super(cityValue);
    this.temperature = cityData[cityValue].temperature;
    this.presentTime = this.timeDisplay()[0];
    this.currentMeridiem = this.timeDisplay()[1];
    this.humidity = cityData[cityValue].humidity;
    this.precipitation = cityData[cityValue].precipitation;
    this.nameCity = getValue.value;
  }

  //Function for importing the temperature values from JSON file
  async temperatureData() {
    let currentTemp = this.temperature;
    let tempArray = [];
    tempArray = await getNxtFiveHrs(this.nameCity);
    return [currentTemp, tempArray];
  }

  //Function for Weather Forecast Container Temperature
  async forecastTemperature() {
    let forecastArray = [];
    let sixHourTempData = await this.temperatureData();
    let currentTemp = sixHourTempData[0].split("°");
    currentTemp = currentTemp[0];
    forecastArray.push(currentTemp);
    let secondHourTemp = sixHourTempData[1][0].split("°");
    secondHourTemp = secondHourTemp[0];
    forecastArray.push(secondHourTemp);
    let thirdHourTemp = sixHourTempData[1][1].split("°");
    thirdHourTemp = thirdHourTemp[0];
    forecastArray.push(thirdHourTemp);
    let fourthHourTemp = sixHourTempData[1][2].split("°");
    fourthHourTemp = fourthHourTemp[0];
    forecastArray.push(fourthHourTemp);
    let fifthHourTemp = sixHourTempData[1][3].split("°");
    fifthHourTemp = fifthHourTemp[0];
    forecastArray.push(fifthHourTemp);
    let sixthHourTemp = sixHourTempData[1][4].split("°");
    sixthHourTemp = sixthHourTemp[0];
    forecastArray.push(sixthHourTemp);
    for (let i = 0; i < forecastArray.length; i++) {
      document.getElementsByClassName("number")[i].innerHTML = forecastArray[i];
    }
    return forecastArray;
  }

  //Function for Weather Forecast Container Icon
  async weatherIconForecast() {
    let tempArray = [];
    let foreCastTempArray = [];
    tempArray = await this.forecastTemperature();
    for (let i = 0; i < tempArray.length; i++) {
      foreCastTempArray[i] = parseInt(tempArray[i], 10);
    }
    let source = "";
    for (let i = 0; i < foreCastTempArray.length; i++) {
      if (foreCastTempArray[i] < 18) {
        source = "/Assets/HTML_CSS/Weather_Icons/rainyIcon.svg";
      }
      if (foreCastTempArray[i] >= 18 && foreCastTempArray[i] < 23) {
        source = "/Assets/HTML_CSS/Weather_Icons/windyIcon.svg";
      }
      if (foreCastTempArray[i] >= 23 && foreCastTempArray[i] < 30) {
        source = "/Assets/HTML_CSS/Weather_Icons/cloudyIcon.svg";
      }

      if (foreCastTempArray[i] > 29) {
        source = "/Assets/HTML_CSS/Weather_Icons/sunnyIcon.svg";
      }
      document.getElementsByClassName("x")[i].src = source;
    }
  }

  //Function for Weather Forecast Container Time
  currentTime() {
    let presentTime = this.presentTime;
    let currentMeridiem = this.currentMeridiem;
    let timeArray = [];
    let meredianArray = [];
    let timeForecast = parseInt(presentTime, 10);
    if (timeForecast === 12 && currentMeridiem == "PM") {
      for (let i = 1; i < 6; i++) {
        timeArray.push(i);
        meredianArray.push("PM");
      }
    }
    if (timeForecast === 12 && currentMeridiem == "AM") {
      for (let i = 1; i < 6; i++) {
        timeArray.push(i);
        meredianArray.push("AM");
      }
    }
    if (timeForecast !== 12) {
      for (let i = 1; i < 6; i++) {
        let timeForecast = parseInt(presentTime, 10);
        if (Math.sign(timeForecast + i - 12) === 0 && currentMeridiem == "PM") {
          timeArray.push(12);
          meredianArray.push("AM");
        }
        if (Math.sign(timeForecast + i - 12) === 0 && currentMeridiem == "AM") {
          timeArray.push(12);
          meredianArray.push("PM");
        } else if (
          Math.sign(timeForecast + i - 12) === -1 &&
          currentMeridiem === "AM"
        ) {
          timeArray.push(timeForecast + i);
          meredianArray.push("AM");
        } else if (
          Math.sign(timeForecast + i - 12) === -1 &&
          currentMeridiem === "PM"
        ) {
          timeArray.push(timeForecast + i);
          meredianArray.push("PM");
        } else if (
          Math.sign(timeForecast + i - 12) === 1 &&
          currentMeridiem == "AM"
        ) {
          timeArray.push(timeForecast + i - 12);
          meredianArray.push("PM");
        } else if (
          Math.sign(timeForecast + i - 12) === 1 &&
          currentMeridiem == "PM"
        ) {
          timeArray.push(timeForecast + i - 12);
          meredianArray.push("AM");
        }
      }
    }
    for (let i = 0; i < timeArray.length + 1; i++) {
      if (i == 0) {
        document.getElementsByClassName("item")[i].innerHTML = "NOW";
      } else {
        document.getElementsByClassName("item")[i].innerHTML =
          timeArray[i - 1] + meredianArray[i - 1];
      }
    }
  }
}
