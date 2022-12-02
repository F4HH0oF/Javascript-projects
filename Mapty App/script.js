'use strict';
/*
TODO: Implement login
TODO: Use npm leaflet install, instead of CDN
*/

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; //km
    this.duration = duration; //min
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    //km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// TESTING
// const run1 = new Running([20, -10], 10.5, 6.25, 200);
// const cycle1 = new Cycling([35, 12], 50, 4, 800);
// console.log(run1, cycle1);
///////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent;
  #workouts = [];
  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    // Getting coordinates of the current position of an user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
        alert(`Couldn't get your location!`);
      });
    }
  }

  _loadMap(position) {
    // Showing location on a map, using the collected coordinates
    const { latitude: lat, longitude: lng } = position.coords;

    const coords = [lat, lng];

    console.log(this);
    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const arePositive = (...inputs) => inputs.every(inp => inp > 0);
    e.preventDefault();

    // Get data from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDistance.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    //If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      //Check if it is valid
      if (
        // !Number.isFinite(distance) &&
        // !Number.isFinite(duration) &&
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !arePositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
      this.#workouts.push(workout);
    }
    //If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      //Check if it is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !arePositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');
      workout = new Cycling([lat, lng], distance, duration, elevation);
      this.#workouts.push(workout);
    }
    //Add new object to workout array
    //Render workout on map as marker
    this.renderWorkoutMarker(workout);
    //Render workout on lsit

    //Hide form + clear input fields
    inputDistance.vlaue =
      inputDuration.vlaue =
      inputCadence.vlaue =
      inputElevation.vlaue =
        '';
  }
  renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          midWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(workout.distance)
      .openPopup();
  }
}

const app = new App();

