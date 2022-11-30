'use strict';
/*
TODO: Implement login
TODO: Use npm leaflet install, instead of CDN
*/

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Getting coordinates of the current position of an user
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      // Showing location on a map, using the collected coordinates
      const { latitude: lat, longitude: lng } = position.coords;
      console.log(lat, lng);
      console.log(`https://www.google.com/maps/@${lat},${lng}`);

      const coords = [lat, lng];

      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    },
    () => {
      alert(`Couldn't get your location!`);
    }
  );
}
