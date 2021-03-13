const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoia2FkZXI5M3QiLCJhIjoiY2ttM2h5c2pwM2d0eTJwcDNoOWlreGdyMCJ9.OMawi2J0mPB6UFJiN_-Q1Q&limit=1`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback('Network error');
    } else if ((res.body.message, undefined)) {
      callback(res.body.message, undefined);
    } else if (!res.body.features[0]) {
      callback('We cant found location', undefined);
    } else {
      const [longitud, latitud] = res.body.features[0].center;
      callback(undefined, {
        longitud,
        latitud,
        location: res.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
