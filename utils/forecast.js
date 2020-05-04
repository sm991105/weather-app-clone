const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const forecastURL =
    "http://api.weatherstack.com/current?access_key=aba397db9a2c53c78e4e6c884dafd5fa&query=" +
    latitude +
    "," +
    longitude;

  request({ url: forecastURL, json: true }, (err, result) => {
    if (err) {
      callback("Unable to connect to weather services.");
    } else if (result.body.success === false) {
      callback(result.body.error.type);
    } else {
      const temp = result.body.current.temperature;
      const desc = result.body.current.weather_descriptions[0];
      const wind = result.body.current.wind_speed;
      const humidity = result.body.current.humidity;
      const feelslike = result.body.current.feelslike;
      callback(null, { temp, desc, wind, humidity, feelslike });
    }
  });
};

module.exports = forecast;
