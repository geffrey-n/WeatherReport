//Importing the built-in modules
let http = require("http");
let fs = require("fs");
let path = require("path");
const timeZoneModules = require("../Assets/Node JS/timeZone.js");

//Declaration of the global variables
const host = "localhost";
const port = 8000;

//Declaration of MIME Types to include all type of files
const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript; charset=UTF-8",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

//Declaration of path which refers HTML page
const STATIC_PATH = path.join(process.cwd(), "./");
const toBool = [() => true, () => false];

/** Function that returns the path of the page to be displayed
 * @param {string} url that provides the pathname of the request URL
 * @return {object} Object that returns the path of the page to be diaplyed
 */
const prepareFile = async (url) => {
  const paths = [STATIC_PATH, url];
  if (url.endsWith("/")) paths.push("index.html");
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : STATIC_PATH + "/404.html";
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

/**Function that returns the required value for the given request
 * @param {object} req that provides the details of the request sent by the client
 * @param {object} res the provides the details of the response received from the server
 */
const dataCity = function (req, res) {
  let fullUrl = new URL("http://localhost:8000" + req.url);
  let pathName = fullUrl.pathname;
  let city = fullUrl.search;
  city = city.split("=")[1];
  //Condition for responding the request with the timeZone of all cities
  if (pathName == "/time-zone") {
    res.writeHead(200, {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    let cityDataJson = timeZoneModules.allTimeZones();
    cityDataJson = JSON.stringify(cityDataJson);
    res.end(cityDataJson);
  }
  //Condition for responding the request with the live time of the selected city
  else if (pathName == "/city-data") {
    res.writeHead(200, {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    let oneCityTimeZone = timeZoneModules.timeForOneCity(city);
    oneCityTimeZone = JSON.stringify(oneCityTimeZone);
    res.end(oneCityTimeZone);
  }
  //Condition for responding the request with the next five hours forecast
  else if (pathName == "/hourly-forecast") {
    res.writeHead(200, {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let postRequestBody = JSON.parse(body);
      let cityTDN = postRequestBody.city_Date_Time_Name;
      let hour = postRequestBody.hours;
      let weatherData = postRequestBody.weather_Result;
      let nHourForeCast = timeZoneModules.nextNhoursWeather(
        cityTDN,
        hour,
        weatherData
      );
      let nHourForeCastResponse = JSON.stringify(nHourForeCast);
      res.end(nHourForeCastResponse);
    });
  }
};

/**Function that determines whether the files (js, css) are found or not
 * @param {object} req that provides the details of the request sent by the client
 * @param {object} res the provides the details of the response received from the server
 */
let renderHtmlPage = async function (req, res) {
  const file = await prepareFile(req.url);
  const statusCode = file.found ? 200 : 404;
  const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
  res.writeHead(statusCode, { "Content-Type": mimeType });
  file.stream.pipe(res);
};

//Function that creates a server at the localhost port 8000
let server = http.createServer((req, res) => {
  dataCity(req, res);
  renderHtmlPage(req, res);
});

//Function that listens the server
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
