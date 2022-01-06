const request = require("request")

const getGeoCode = (name, callback) => {
    request(
      {
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json?access_token=pk.eyJ1IjoiaGF5ZGVyYWx5IiwiYSI6ImNreHI4dXJkaDVibnYyeHBmNzNqbjRrYXkifQ.W1wOJXtD5dmEXXaTSqscfA&limit=1`,
        json: true,
      },
      (err, res) => {
  
        if (err) {
          callback("Unable to connect to Geocoding service");
        } else if (res.body.features.length === 0) {
          callback("Unable to find the location ..");
        } else {
          const lat = res.body.features[0].center[1];
          const lng = res.body.features[0].center[0];
          const location = res.body.features[0].place_name;
          callback(undefined,{lat, lng, location});
        }
      }
    );
  };

module.exports = getGeoCode