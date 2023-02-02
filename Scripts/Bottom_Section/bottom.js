//Importing the functions from filterContinent javascript
import {
  ascendingContinentTemAsc,
  ascendingContinentTemDes,
  descendingContinentTemAsc,
  descendingContinentTemDes,
} from "./filterContinent.js";
//Importing the class and function from dateAndTime javascript
import { dateTime } from "../Top_Section/dateAndTime.js";
import { cityData } from "../Top_Section/dateAndTime.js";

// Decalaration of global variables
let userContinentSelect = document.getElementsByClassName("continent-arrow")[0];
let userTemperatureSelect =
  document.getElementsByClassName("temperature-arrow")[0];

//Declaration of Class with methods
class bottomSection {
  /** Function for changing the arrow for the continent */
  continentSelect() {
    let userContinent = userContinentSelect.src.split("/");
    if (userContinent[6] == "arrowUp.svg") {
      document.getElementsByClassName("continent-arrow")[0].src =
        "./Assets/HTML_CSS/General_Images_Icons/arrowDown.svg";
    } else if (userContinent[6] == "arrowDown.svg") {
      document.getElementsByClassName("continent-arrow")[0].src =
        "./Assets/HTML_CSS/General_Images_Icons/arrowUp.svg";
    }
  }

  /** Function for changing the arrow for the temperature */
  temperatureSelect() {
    let userTemperature = userTemperatureSelect.src.split("/");
    if (userTemperature[6] == "arrowUp.svg") {
      document.getElementsByClassName("temperature-arrow")[0].src =
        "./Assets/HTML_CSS/General_Images_Icons/arrowDown.svg";
    } else if (userTemperature[6] == "arrowDown.svg") {
      document.getElementsByClassName("temperature-arrow")[0].src =
        "./Assets/HTML_CSS/General_Images_Icons/arrowUp.svg";
    }
  }

  /** Function to return the required array for the timeDisplay function based on the provided conditions */
  continentSort() {
    let userContinent = userContinentSelect.src.split("/");
    let userTemperature = userTemperatureSelect.src.split("/");
    if (
      userContinent[6] == "arrowUp.svg" &&
      userTemperature[6] == "arrowUp.svg"
    ) {
      this.continentCards(ascendingContinentTemAsc);
    } else if (
      userContinent[6] == "arrowUp.svg" &&
      userTemperature[6] == "arrowDown.svg"
    ) {
      this.continentCards(ascendingContinentTemDes);
    } else if (
      userContinent[6] == "arrowDown.svg" &&
      userTemperature[6] == "arrowUp.svg"
    ) {
      this.continentCards(descendingContinentTemAsc);
    } else if (
      userContinent[6] == "arrowDown.svg" &&
      userTemperature[6] == "arrowDown.svg"
    ) {
      this.continentCards(descendingContinentTemDes);
    }
  }

  /** Function to return the required array for the timeDisplay function based on the provided conditions */
  temperatureSort() {
    let userContinent = userContinentSelect.src.split("/");
    let userTemperature = userTemperatureSelect.src.split("/");
    if (
      userContinent[6] == "arrowUp.svg" &&
      userTemperature[6] == "arrowUp.svg"
    ) {
      this.continentCards(ascendingContinentTemAsc);
    } else if (
      userContinent[6] == "arrowUp.svg" &&
      userTemperature[6] == "arrowDown.svg"
    ) {
      this.continentCards(ascendingContinentTemDes);
    } else if (
      userContinent[6] == "arrowDown.svg" &&
      userTemperature[6] == "arrowUp.svg"
    ) {
      this.continentCards(descendingContinentTemAsc);
    } else if (
      userContinent[6] == "arrowDown.svg" &&
      userTemperature[6] == "arrowDown.svg"
    ) {
      this.continentCards(descendingContinentTemDes);
    }
  }

  /** *Function to return the time for the given city
   * @param {string} zone provides the time zone of the city
   * @param {string} id provides the index of the continent card
   * @return {array} Array returns the value of hours, minutes and meridian of the city provided
   */
  timeDisplayContinent(zone, id) {
    let cityName = zone.split("/")[1];
    cityName = cityName.toLowerCase();
    cityName = cityName.split("_").join("");
    let dateAndTime = new dateTime(cityName);
    let dateTimeCity = dateAndTime.setZone();
    let date = dateTimeCity.split(", ");
    date = date[1];
    let hrsMins = date.split(":");
    let hrs = hrsMins[0];
    let hrsDisp = "";
    if (hrs.length == 1) {
      hrsDisp = "0" + hrs;
    } else {
      hrsDisp = hrs;
    }
    let mins = hrsMins[1];
    let sec = hrsMins[2].split(" ");
    document.getElementById(id).innerHTML = hrsDisp + ":" + mins + " " + sec[1];
  }

  /** *Function to create the continent cards for the bottom section
   * @param {array} array provides the city names based on the user input
   */
  continentCards(array) {
    document.getElementsByClassName("bottom")[0].replaceChildren();
    for (let i = 0; i < 12; i++) {
      let zone = cityData[array[i][4]].timeZone;
      let continentCard = `
      <div class="continent">
            <span class="continentname">${array[i][3]}</span>
            <div class="state-name-time""><span >${array[i][0]},</span> <span id="state-time${i}"></span></div>
            <span class="state-temperature">${array[i][1]} <span>&#176;</span>C</span>
            <div class="state-humidity">
              <img class="state-humidityimage" src="./Assets/HTML_CSS/Weather_Icons/humidityIcon.svg">
              <span class="state-humidityvalue">${array[i][2]}</span>
            </div>
          </div>`;
      document.getElementsByClassName("bottom")[0].innerHTML += continentCard;
      let intervalSelect = setInterval(
        this.timeDisplayContinent,
        1,
        zone,
        `state-time${i}`
      );
      userContinentSelect.addEventListener("click", function () {
        clearInterval(intervalSelect);
      });
      userTemperatureSelect.addEventListener("click", function () {
        clearInterval(intervalSelect);
      });
    }
  }
}

//Declaration of object for the class
let continentCards = new bottomSection();

//Event listener for listening the event for the sorting of continent
userContinentSelect.addEventListener("click", () => {
  continentCards.continentSelect();
  continentCards.continentSort();
});

//Event listener for listening the event for the sorting of temperature
userTemperatureSelect.addEventListener("click", () => {
  continentCards.temperatureSelect();
  continentCards.temperatureSort();
});

//IIFE function for displaying the default values for the bottom section
let defaultbottom = (function () {
  continentCards.continentCards(ascendingContinentTemAsc);
})();
