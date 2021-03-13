const request = require('postman-request');

const weather = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1e0c6acdda280881e1abafce32090f71&query=${long},${lat}`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback('Network error ', undefined);
    } else if (res.body.error) {
      callback(
        {
          code: res.body.error.code,
          type: res.body.error.type,
          info: res.body.error.info,
        },
        undefined
      );
    } else {
      const { current } = res.body;
      const { temperature } = current;
      const feelsLike = current.feelslike;
      const description = current.weather_descriptions;
      callback(undefined, {
        temperature,
        feelsLike,
        description,
      });
    }
  });
};

module.exports = weather;
