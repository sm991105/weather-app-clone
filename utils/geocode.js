const request = require("request");

const geocode = (address, callback) => {
  const geoURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic205OTExMDUiLCJhIjoiY2s5ampsOHJoMWtxbTNlbndhcW02Z3djeSJ9.8gEY7YDkT59rHj7mkQ97Lw";
  request({ url: geoURL, json: true }, (err, result) => {
    if (err) callback("Unable to connect to weather services.", undefined);
    else if (result.body.features.length === 0) {
      callback("Location not found.", undefined);
    } else {
      callback(undefined, {
        place_name: result.body.features[0].place_name,
        longitude: result.body.features[0].center[0],
        latitude: result.body.features[0].center[1],
      });
    }
  });
};

module.exports = geocode;
