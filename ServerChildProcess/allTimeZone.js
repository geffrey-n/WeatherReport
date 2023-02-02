//Importing the custom package weather-time-data
const timeZone = require("weather-time-data");

//Child Process for the function allTimeZones()
//The event is triggered when the message is received from the main process
process.on("message", () => {
  const allCityTime = timeZone.allTimeZones();
  process.send(allCityTime);
  process.exit();
});
