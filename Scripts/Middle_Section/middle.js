//Importing functions from dateAndTime, filterCity javascripts
import {
  sunnyCitiesTemp,
  rainyCitiesHumid,
  cloudyCitiesPrecipt,
} from "./filterCity.js";
import { dateTime } from "../Top_Section/dateAndTime.js";

//Declaration of global variables
let leftScrollImg = document.getElementsByClassName("arrow--left")[0];
let rightScrollImg = document.getElementsByClassName("arrow--right")[0];
var sun = document.getElementsByClassName("sun")[0];
var rain = document.getElementsByClassName("rain")[0];
var snow = document.getElementsByClassName("snow")[0];
var getValue = document.getElementsByClassName("display-topvalue")[0];
var selectedArray = "";
var iconName = "";

//Declaration of Class with methods
class middleSection {
  //Assigning the minimum and maximum value for display top
  displayValue() {
    if (getValue.value >= 3 && getValue.value <= 10) {
      return getValue.value;
    } else if (getValue.value < 3) {
      return (getValue.value = 3);
    } else if (getValue.value > 10) {
      return (getValue.value = 10);
    }
  }

  /** *Function to return the time of the cities with the required format
   * @param {string} cityName provides the name of the city
   * @return {array} Array returns the value of the hours, minutes and meridian
   */
  timeDisplayCity(cityName, id) {
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

  /** *Function to create the city cards for the middle section
   * @param {array} array provides the list of cities for the selected icon
   */
  cityCards(array) {
    document.getElementsByClassName("cities-card")[0].replaceChildren();
    let val = this.displayValue();
    let len = array.length;
    let cityCardValue = getValue.value;
    try {
      if (len <= 3) {
        val = len;
      } else if (cityCardValue <= len) {
        val = cityCardValue;
      } else {
        val = len;
      }
    } catch (error) {
      val = error;
    }
    for (let i = 0; i < val; i++) {
      let monthCity = new dateTime(array[i][0]);
      let cityCard = `
        <div class="topcities-1" style="background-image: url('/Assets/HTML_CSS/Icons_for_cities/${
          array[i][0]
        }.svg');">
              <span class="city-name-1">${array[i][4]}</span>
              <div class="city-time-1"><span id="city-time${i}"></span></div>
              <span class="city-date-1">${monthCity.monthDisplay()}</span>
              <span class="city-rain-1">
                <img class="city-rainimage-1" src="./Assets/HTML_CSS/Weather_Icons/humidityIcon.svg">
                <span class="city-rainvalue-1">${array[i][2]}%</span>
              </span>
              <span class="city-cloud-1">
                <img class="city-cloudimage-1" src="./Assets/HTML_CSS/Weather_Icons/precipitationIcon.svg">
                <span class="city-cloudvalue-1">${array[i][3]}%</span>
              </span>
              <span class="city-temperature-1">
                <img class="city-temperatureimage-1" src='./Assets/HTML_CSS/Weather_Icons/${iconName}.svg'>
                <span class="city-temperaturevalue-1">${
                  array[i][1]
                } <span>&#176;</span>C</span>
              </span>
            </div>`;
      document.getElementsByClassName("cities-card")[0].innerHTML += cityCard;
      let intervalSelect = setInterval(
        this.timeDisplayCity(array[i][0], `city-time${i}`),
        1
      );
      sun.addEventListener("click", function () {
        clearInterval(intervalSelect);
      });
      rain.addEventListener("click", function () {
        clearInterval(intervalSelect);
      });
      snow.addEventListener("click", function () {
        clearInterval(intervalSelect);
      });
    }
  }
}

//Declaration of object for the subclass
let cityCards = new middleSection();

//Hover effect on left arrow in the middle section
leftScrollImg.onmouseover = function () {
  leftScrollImg.style.backgroundColor = "rgb(128, 128, 128)";
};
leftScrollImg.onmouseout = function () {
  leftScrollImg.style.backgroundColor = "rgb(128, 128, 128,0.5)";
};

//Hover effect on right arrow in the middle section
rightScrollImg.onmouseover = function () {
  rightScrollImg.style.backgroundColor = "rgb(128, 128, 128)";
};
rightScrollImg.onmouseout = function () {
  rightScrollImg.style.backgroundColor = "rgb(128, 128, 128,0.5)";
};

//Function call for scrolling the middle section
leftScrollImg.addEventListener("click", (event) => {
  scrollLeft();
});
rightScrollImg.addEventListener("click", (event) => {
  scrollRight();
});

//Function for scrolling left
function scrollLeft() {
  let imgSrc = document.getElementsByClassName("cities-card")[0];
  imgSrc.scrollBy(-225, 0);
}

//Function for scrolling right
function scrollRight() {
  let imgSrc = document.getElementsByClassName("cities-card")[0];
  imgSrc.scrollBy(225, 0);
}

//Event listener for listening the event for the selection of sunny cities
sun.addEventListener("click", (event) => {
  selectedArray = "sunny";
  document.getElementsByClassName("sun")[0].style.borderBottom =
    "solid  #00C0F1";
  document.getElementsByClassName("snow")[0].style.borderBottom = "";
  document.getElementsByClassName("rain")[0].style.borderBottom = "";
  iconName = "sunnyIcon";
  cityCards.cityCards(sunnyCitiesTemp);
});

//Event listener for listening the event for the selection of rainy cities
rain.addEventListener("click", (event) => {
  selectedArray = "rainy";
  document.getElementsByClassName("rain")[0].style.borderBottom =
    "solid  #00C0F1";
  document.getElementsByClassName("snow")[0].style.borderBottom = "";
  document.getElementsByClassName("sun")[0].style.borderBottom = "";
  iconName = "rainyIcon";
  cityCards.cityCards(rainyCitiesHumid);
});

//Event listener for listening the event for the selection of cloudy cities
snow.addEventListener("click", (event) => {
  selectedArray = "cloudy";
  document.getElementsByClassName("snow")[0].style.borderBottom =
    "solid #00C0F1";
  document.getElementsByClassName("sun")[0].style.borderBottom = "";
  document.getElementsByClassName("rain")[0].style.borderBottom = "";
  iconName = "snowflakeIcon";
  cityCards.cityCards(cloudyCitiesPrecipt);
});

//Getting the user input
getValue.addEventListener("change", function () {
  if (selectedArray === "sunny") {
    cityCards.cityCards(sunnyCitiesTemp);
  } else if (selectedArray === "cloudy") {
    cityCards.cityCards(cloudyCitiesPrecipt);
  } else if (selectedArray === "rainy") {
    cityCards.cityCards(rainyCitiesHumid);
  }
});

//IIFE function for displaying the default values for the middle section
var defaultonload = (function () {
  document.getElementsByClassName("sun")[0].style.borderBottom =
    "solid  #00C0F1";
  document.getElementsByClassName("snow")[0].style.borderBottom = "";
  document.getElementsByClassName("rain")[0].style.borderBottom = "";
  iconName = "sunnyIcon";
  cityCards.cityCards(sunnyCitiesTemp);
})();
