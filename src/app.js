const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geo_code');
const weather = require('./utils/weather');

const app = express();
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partial');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    name: 'Abdelkader',
    title: 'Weather',
    info: 'Show the weather of your city ',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Abdelkader',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'help message',
    name: 'abdelkader',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    name: 'Abdelkader',
    title: '404',
    error: 'Help article not found',
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (address) {
    geocode(address, (err, { longitud, latitud, location } = {}) => {
      if (err) {
        res.send({
          error: err,
        });
      } else {
        weather(longitud, latitud, (errW, dataW) => {
          if (errW) {
            res.send({
              error: err,
            });
          } else {
            res.send({
              location_info: {
                longitud,
                latitud,
                location,
              },
              weather_info: dataW,
            });
          }
        });
      }
    });
  }
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Abdelkader',
    error: 'Page not found',
  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server start correctly');
  // eslint-disable-next-line no-console
  console.log('Server is running ;)');
});
