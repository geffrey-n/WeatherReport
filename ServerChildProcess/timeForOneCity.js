//Importing the custom package weather-time-data
const timeZone = require("weather-time-data");

//Child Process for the function timeForOneCity()
//The event is triggered when the message is received from the main process
process.on("message", (data) => {
  const cityTime = timeZone.timeForOneCity(data.city);
  process.send(cityTime);
  process.exit();
});
