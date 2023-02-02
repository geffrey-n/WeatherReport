//Importing the custom package weather-time-data
const timeZone = require("weather-time-data");

//Child Process for the function nextNhoursWeather()
//The event is triggered when the message is received from the main process
process.on("message", (data) => {
  const nxtWeatherForecast = timeZone.nextNhoursWeather(
    data.cityDTN,
    data.hours,
    data.weatherResult
  );
  let nHourForeCastResponse = JSON.stringify(nxtWeatherForecast);
  process.send(nHourForeCastResponse);
  process.exit();
});
