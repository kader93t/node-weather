const form = document.querySelector('form');
const locationElement = document.querySelector('#location');
const weather = document.querySelector('#weather');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const adress = e.target.adress.value;
  fetch(`/weather?address=${adress}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        locationElement.textContent = data.error;
      } else {
        locationElement.textContent = data.location_info.location;
        const { temperature, feelsLike, description } = data.weather_info;
        weather.textContent = `It is ${temperature} degres out, it feels like ${feelsLike} degres out, it is ${description}`;
      }
    });
  });
});
