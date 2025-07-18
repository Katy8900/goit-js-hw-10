import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.getElementById('datetime-picker'),
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  monthSelectorType: 'dropdown',
  yearSelectorType: 'dropdown',
  locale: {
    firstDayOfWeek: 0,
    weekdays: {
      shorthand: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      longhand: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
  },
  onOpen(selectedDates, dateStr, instance) {
    setTimeout(() => {
      instance.calendarContainer.style.top = '84px';
    }, 0);
  },
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.warning({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        timeout: 3000,
        close: true,
        class: 'custom-toast',
      });
      refs.btn.disabled = true;
    } else {
      refs.btn.disabled = false;
    }
  },
};
flatpickr(refs.input, options);

refs.btn.addEventListener('click', () => {
  refs.btn.disabled = true;
  refs.input.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const delta = selectedDate - now;

    if (delta <= 0) {
      clearInterval(timerId);

      return;
    }
    updateTimer(delta);
  }, 1000);
});

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

import '../css/styles.css';

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
