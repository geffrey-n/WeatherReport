//Importing the function from API javascript
import { fetchCityData } from "../API/Data.js";

//Declaration of global variables
export let cityData = {};

/** Function that creates the object from async function that sends fetch request and receive the response from the web server */
async function cityValues() {
  let apiValue = await fetchCityData();
  for (let i = 0; i < apiValue.length; i++) {
    cityData[apiValue[i].cityName.toLowerCase()] = apiValue[i];
  }
}
await cityValues();

//Declaration of Class with constructor and methods
export class dateTime {
  constructor(cityValue) {
    this.cityValue = cityValue;
  }

  //Function for returning the current date and time for the selected city
  setZone() {
    let date = new Date();
    let dispTime = date.toLocaleString("en-US", {
      timeZone: cityData[this.cityValue].timeZone,
    });
    return dispTime;
  }

  //Function to display the current time of the selected city
  timeDisplay() {
    let dateTime = this.setZone();
    let date = dateTime.split(", ");
    date = date[1];
    let hrsMins = date.split(":");
    let hrs = hrsMins[0];
    let hrsDisp = "";
    hrsDisp = hrs.length == 1 ? "0" + hrs : hrs;
    let mins = hrsMins[1];
    let sec = hrsMins[2].split(" ");
    let secDisp = sec[0];
    let meredian = sec[1].toLowerCase();
    let Icon = document.getElementsByClassName("time-icon")[0];
    let Iconpath =
      "/Assets/HTML_CSS/General_Images_Icons/" + meredian + "State.svg";
    Icon.src = Iconpath;
    document.getElementsByClassName("hrs-mins")[0].innerHTML =
      hrsDisp + " : " + mins;
    document.getElementsByClassName("seconds")[0].innerHTML =
      this.secondDisplay();
    return [hrsDisp, sec[1], mins];
  }

  //Function to display the current seconds of the selected city
  secondDisplay() {
    let dateTime = this.setZone();
    let date = dateTime.split(", ");
    date = date[1];
    let hrsMins = date.split(":");
    let sec = hrsMins[2].split(" ");
    let secDisp = sec[0];
    return ": " + secDisp;
  }

  //Function to display the current date of the selected city
  monthDisplay() {
    let dateTime = this.setZone();
    let date = dateTime.split(", ");
    date = date[0];
    let monthSplit = date.split("/");
    let month = monthSplit[0];
    let monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (monthSplit[1].length == 1) {
      return (
        "0" + monthSplit[1] + "-" + monthArray[month - 1] + "-" + monthSplit[2]
      );
    }
    return monthSplit[1] + "-" + monthArray[month - 1] + "-" + monthSplit[2];
  }
}
