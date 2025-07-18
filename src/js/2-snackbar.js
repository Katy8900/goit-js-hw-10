import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createPromise(state, delay)
    .then(message => {
      iziToast.success({
        message: message,
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch(message => {
      iziToast.error({
        message: message,
        position: 'topRight',
        timeout: 3000,
      });
    });
});

function createPromise(state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}

import '../css/styles.css';
