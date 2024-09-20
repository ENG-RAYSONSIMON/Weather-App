const express = require("express");
const { STATUS_CODES } = require("http");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post('/', function (req, res) {
  
  const query = req.body.cityName;
  const apiKey = "814912474443882e4b82d90a26772a3f";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    units +
    "&appid=" +
    apiKey;
  
  https.get(url, function (respond) {
    console.log(respond.statusCode);
  
    respond.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write(
        "<h1> The temperature of " +
          query +
          " is " +
          temp +
          " degree Celcius.</h1> "
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});


app.listen(5000, function () {
  console.log("Server is running in port 5000");
});
