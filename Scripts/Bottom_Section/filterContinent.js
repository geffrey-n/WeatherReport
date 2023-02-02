//Importing functions from Top javascript
import { cityArrayFunction } from "../Top_Section/top.js";
import { cityData } from "../Top_Section/dateAndTime.js";

//Declaration of global variables
let jsonKeys = cityArrayFunction();
let ascendingContinent = [];
export let ascendingContinentTemAsc = [];
export let ascendingContinentTemDes = [];
export let descendingContinentTemAsc = [];
export let descendingContinentTemDes = [];

//Declaration of Class with methods
class filterContinent {
  /** *Function to return an array with values of the city name, temperature, humidity, timezone using map function
   * @param {string} jsonKeys provides the name of the city
   */
  cityContinent(jsonKeys) {
    ascendingContinent.push([
      cityData[jsonKeys].cityName,
      parseInt(cityData[jsonKeys].temperature.split("°")[0]),
      cityData[jsonKeys].humidity,
      cityData[jsonKeys].timeZone.split("/")[0],
      jsonKeys,
    ]);
  }

  /** *Function to sort the array based on the continent name in ascending using sort function
   * @param {string} a provides the name of the continent
   * @param {string} b provides the name of the next continent to be compared
   * @return {number} 0 id returned when both the continent names are same
   * @return {string} Strings are swapped when the given condition is satisfied
   */
  ascCont(a, b) {
    if (a[3] == b[3]) {
      return 0;
    } else {
      return a[3] < b[3] ? -1 : 1;
    }
  }

  /** *Function to sort the array based on the temperature in ascending using sort function
   * @param {string} a provides the temperature of the city
   * @param {string} b provides the name of the next temperature of the city to be compared
   * @return {string} Strings are swapped when the given condition is satisfied
   */
  ascContAscTemp(a, b) {
    if (a[3] == b[3]) {
      return a[1] < b[1] ? -1 : 1;
    }
  }

  /** *Function to sort the array based on the temperature in descending using sort function
   * @param {string} a provides the temperature of the city
   * @param {string} b provides the name of the next temperature of the city to be compared
   * @return {string} Strings are swapped when the given condition is satisfied
   */
  ascContDesTemp(a, b) {
    if (a[3] == b[3]) {
      return a[1] > b[1] ? -1 : 1;
    }
  }
}

//Declaration of object for the class
let continentFilter = new filterContinent();

//Iterating through the array to obtain the continent along with cities
jsonKeys.map(continentFilter.cityContinent);

//Function call for sorting the continents in ascending
ascendingContinent.sort(continentFilter.ascCont);

//Assigning the Ascending Continent array to two different arrays for sorting temperature in ascending and descending
ascendingContinentTemAsc = [...ascendingContinent];
ascendingContinentTemDes = [...ascendingContinent];

//Function call for sorting the continents and temperature in ascending
ascendingContinentTemAsc.sort(continentFilter.ascContAscTemp);

//Function call for sorting the continents in ascending and temperature in descending
ascendingContinentTemDes.sort(continentFilter.ascContDesTemp);

//Reversing the arrays for descending sort based on the sort using reverse function
descendingContinentTemAsc = [...ascendingContinentTemDes];
descendingContinentTemAsc.reverse();
descendingContinentTemDes = [...ascendingContinentTemAsc];
descendingContinentTemDes.reverse();
