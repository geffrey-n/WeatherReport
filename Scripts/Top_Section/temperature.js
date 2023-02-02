//Importing the class from weatherForecast javascript
import { weatherForecast } from "./weatherForecast.js";

//Declaration of subclass with methods
export class temperatureCity extends weatherForecast {
  //Function to display the temperature in Celsius for selected city
  temperatureCelsius() {
    let celTemp = new weatherForecast(this.cityValue);
    let tempCel = celTemp.temperature;
    tempCel = tempCel.replace("°", " ");
    return tempCel;
  }

  //Function to display the temperature in Farenheit for selected city
  temperatureFarenheit() {
    let tempCel = this.temperatureCelsius();
    let tempFaren = parseInt(tempCel, 10);
    tempFaren = parseInt(tempFaren * (9 / 5)) + 32;
    return tempFaren + " F";
  }

  //Function to display the humidity for selected city
  temperatureHumidity() {
    let humidValue = new weatherForecast(this.cityValue);
    let humidity = humidValue.humidity;
    return humidity;
  }

  //Function to display the precipitation for selected city
  temperaturePrecipitation() {
    let preciptValue = new weatherForecast(this.cityValue);
    let precipitation = preciptValue.precipitation;
    return precipitation;
  }
}
