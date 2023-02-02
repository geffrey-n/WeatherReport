//Importing the function from Top_Section javascript
import { cityData } from "../Top_Section/dateAndTime.js";

//Declaration of global variables
var cityArrayLength = document.getElementById("city-names").options.length;
var cityArray = [];

//Declaring and Exporting the global variables
export var sunnyCitiesTemp = [];
export var cloudyCitiesPrecipt = [];
export var rainyCitiesHumid = [];

//Declaration of Class with methods
export class filterCity {
  /** Function for creating an array containing the sunny cities with its values of temperature, humidity and precipitation
   *@param {string} cityName provides the sunny cities taht are filtered
   */
  sunnyCities(cityName) {
    let cityValue = cityData[cityName].cityName;
    let temp = cityData[cityName].temperature;
    let humid = cityData[cityName].humidity;
    let precipt = cityData[cityName].precipitation;
    sunnyCitiesTemp.push([
      cityName,
      parseInt(temp),
      parseInt(humid),
      parseInt(precipt),
      cityValue,
    ]);
  }

  /** Function for creating an array containing the cloudy cities with its values of temperature, humidity and precipitation
   *@param {string} cityName provides the cloudy cities taht are filtered
   */

  cloudyCities(cityName) {
    let valueCity = cityData[cityName].cityName;
    let temp = cityData[cityName].temperature;
    let humid = cityData[cityName].humidity;
    let precipt = cityData[cityName].precipitation;
    cloudyCitiesPrecipt.push([
      cityName,
      parseInt(temp),
      parseInt(humid),
      parseInt(precipt),
      valueCity,
    ]);
  }

  /** Function for creating an array containing the rainy cities with its values of temperature, humidity and precipitation
   *@param {string} cityName provides the rainy cities taht are filtered
   */
  rainyCities(cityName) {
    let cityValue = cityData[cityName].cityName;
    let temp = cityData[cityName].temperature;
    let humid = cityData[cityName].humidity;
    let precipt = cityData[cityName].precipitation;
    rainyCitiesHumid.push([
      cityName,
      parseInt(temp),
      parseInt(humid),
      parseInt(precipt),
      cityValue,
    ]);
  }
}

//Declaration of object for the class
let cityFilter = new filterCity();

//Getting the values of the city name from the options available based on the JSON file
for (let i = 0; i < cityArrayLength; i++) {
  let cityName = document.getElementById("city-names").options.item(i).value;
  cityName = cityName.toLowerCase();
  cityName = cityName.replace(" ", "");
  cityArray.push(cityName);
}

//Filtering the sunny cities
export var sunnyCities = cityArray.filter(
  (city) =>
    parseInt(cityData[city].temperature) > 29 &&
    parseInt(cityData[city].humidity) < 50 &&
    parseInt(cityData[city].precipitation) >= 50
);

//Function call for calling the sunny function
for (let i = 0; i < sunnyCities.length; i++) {
  cityFilter.sunnyCities(sunnyCities[i]);
}

//Sorting the sunny cities based on the name of the cities
for (let i = 0; i < sunnyCitiesTemp.length; i++) {
  for (let j = i + 1; j < sunnyCitiesTemp.length; j++) {
    if (sunnyCitiesTemp[i][1] < sunnyCitiesTemp[j][1]) {
      let temp = sunnyCitiesTemp[i];
      sunnyCitiesTemp[i] = sunnyCitiesTemp[j];
      sunnyCitiesTemp[j] = temp;
    }
  }
}

//Filtering the cloudy cities
export var cloudyCities = cityArray.filter(
  (city) =>
    parseInt(cityData[city].temperature) >= 20 &&
    parseInt(cityData[city].temperature) <= 29 &&
    parseInt(cityData[city].humidity) > 50 &&
    parseInt(cityData[city].precipitation) < 50
);

//Function call for calling the cloudy function
for (let i = 0; i < cloudyCities.length; i++) {
  cityFilter.cloudyCities(cloudyCities[i]);
}

//Sorting the cloudy cities based on the name of the cities
for (let i = 0; i < cloudyCitiesPrecipt.length; i++) {
  for (let j = i + 1; j < cloudyCitiesPrecipt.length; j++) {
    if (cloudyCitiesPrecipt[i][3] < cloudyCitiesPrecipt[j][3]) {
      let temp = cloudyCitiesPrecipt[i];
      cloudyCitiesPrecipt[i] = cloudyCitiesPrecipt[j];
      cloudyCitiesPrecipt[j] = temp;
    }
  }
}

//Filtering the rainy cities
export var rainyCities = cityArray.filter(
  (city) =>
    parseInt(cityData[city].temperature) < 20 &&
    parseInt(cityData[city].humidity) >= 50
);

//Function call for calling the rainy function
for (let i = 0; i < rainyCities.length; i++) {
  cityFilter.rainyCities(rainyCities[i]);
}

//Sorting the rainy cities based on the name of the cities
for (let i = 0; i < rainyCitiesHumid.length; i++) {
  for (let j = i + 1; j < rainyCitiesHumid.length; j++) {
    if (rainyCitiesHumid[i][2] < rainyCitiesHumid[j][2]) {
      let temp = rainyCitiesHumid[i];
      rainyCitiesHumid[i] = rainyCitiesHumid[j];
      rainyCitiesHumid[j] = temp;
    }
  }
}
