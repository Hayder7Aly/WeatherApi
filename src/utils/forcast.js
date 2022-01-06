const request = require("request")

const forCast = ({lat, lng, location},callback) => {
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=daily,hourly&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;
    request({ url: URL, json: true }, (error, response) => {
      if (error) {
        callback(`Unable to connect to weather service ..`);
      } else if (response.body.error) {
        callback("Unable to find location ..");
      } else {
        const description = `It is currently : ${response.body.current.temp} . DegreeOut => ${response.body.current.weather[0].main}`
        callback(undefined, {location,description})
      }
    });
  };

module.exports = forCast