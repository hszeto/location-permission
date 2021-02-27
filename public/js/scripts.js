const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!position || !position.coords) {
          return resolve('Can`t find your position. Where you at?');
        }

        const { latitude, longitude, accuracy } = position.coords;

        return resolve({ latitude, longitude, accuracy });
      },
      (err) => {
        if (err && err.code && err.code === 1) {
          return resolve('Denied! Not Allowed! Nope!');
        }
        return reject('ERROR');
      }
    );
  });
};

const stopLoader = () => {
  const loader  = document.querySelector('#loader');
  loader.style.display = 'none';
}

const renderError = (msg) => {
  const error  = document.querySelector('#error');
  stopLoader();

  error.append(msg);
  error.style.display = 'block';
}

const renderResults = ({ latitude, longitude, accuracy }) => {
  const lat = document.querySelector('#lat');
  const lon = document.querySelector('#long');
  const acc = document.querySelector('#accuracy');
  const results = document.querySelector('#results');

  lat.append(latitude);
  lon.append(longitude);
  acc.append(accuracy);
  stopLoader();
  results.style.display = 'block';
}

const init = async () => {
  const respond = await getCurrentPosition();

  typeof respond === 'object'
    ? renderResults(respond)
    : renderError(respond);
};

init();
