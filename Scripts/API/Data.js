/**Async function to send fetch request and receive the response from the web server
 * @return {Object} cityTimeZone returns the data of all cities from the API
 */
export async function fetchCityData() {
  try {
    let fetchZone = fetch("http://localhost:8000/time-zone");
    let response = await fetchZone;
    let cityTimeZone = await response.json();
    return cityTimeZone;
  } catch (error) {
    window.alert("Website cannot fetch the data from the Web server");
  }
}

/** Function that fetches and receive the response of the temperature for next five hours
 * @param {String} cityName provides the name of the city selected by the user
 * @return {Array} Array that return the value of next five hours temperature
 */
export async function getNxtFiveHrs(cityName) {
  try {
    let fetchZone = fetch(`http://localhost:8000/city-data?name=${cityName}`)
      .then((res) => res.json())
      .then((data) => {
        return data.city_Date_Time_Name;
      });
    let weather_result = await fetchCityData();
    let zoneResult = await fetchZone;
    let fiveHrsData = fetch("http://localhost:8000/hourly-forecast", {
      method: "POST",
      body: JSON.stringify({
        city_Date_Time_Name: zoneResult,
        hours: 6,
        weather_Result: weather_result,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res)
      .then((data) => data.text())
      .then((data) => {
        let temperatureCity = JSON.parse(data);
        return temperatureCity.temperature;
      });
    let fiveHrsResult = await fiveHrsData;
    return fiveHrsResult;
  } catch (error) {
    window.alert("Website cannot fetch the data from the Web server");
  }
}
