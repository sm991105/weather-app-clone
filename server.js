const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = 3000;

// Define paths for express config
const publicPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Serve static directory in express
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Suemincho",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Suemincho",
  });
});

app.get("/help", (req, res) => {
  res.render("Help", {
    title: "Help",
    name: "Suemincho",
  });
});

//
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must specify the address." });
  }
  geocode(req.query.address, (err, geocodeData) => {
    if (err) {
      return res.send({ err });
    }
    const latitude = geocodeData.latitude;
    const longitude = geocodeData.longitude;
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }
      const place_name = geocodeData.place_name;
      const temp = forecastData.temp;
      const humidity = forecastData.humidity;
      const wind = forecastData.wind;
      const feelslike = forecastData.feelslike;
      const desc = forecastData.desc;
      res.send({
        place_name,
        temp,
        humidity,
        wind,
        feelslike,
        desc,
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
