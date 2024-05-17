import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnElem = document.querySelector("[data-start]");
const inputElem = document.querySelector("#datetime-picker");
const daysElem = document.querySelector("[data-days]");
const hoursElem = document.querySelector("[data-hours]");
const minutesElem = document.querySelector("[data-minutes]");
const secondsElem = document.querySelector("[data-seconds]");
let userSelectedDate = null;
let timerIsActive = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
      
    if (userSelectedDate < Date.now()) {
        iziToast.show({
            message: 'Please choose a date in the future',
            color: 'red',
            position: 'topRight'
        });
        btnElem.disabled = true;
    } else {
        btnElem.disabled = false;
    }
  },
};

flatpickr(inputElem, options);

btnElem.addEventListener("click", setTimer);

function setTimer() {
    if (timerIsActive) return;

    timerIsActive = true;
    inputElem.disabled = true;
    btnElem.disabled = true;

    const intervalId = setInterval(() => {
        const timeLeft = convertMs(userSelectedDate - Date.now());
        const { days, hours, minutes, seconds } = timeLeft;

        startTimer({ days, hours, minutes, seconds });
    }, 1000);

    setTimeout(() => {
        clearInterval(intervalId);
        timerIsActive = false;
        inputElem.disabled = false;
    }, userSelectedDate - Date.now());
}

function startTimer({ days, hours, minutes, seconds }) {
    daysElem.textContent = days;
    hoursElem.textContent = hours;
    minutesElem.textContent = minutes;
    secondsElem.textContent = seconds;
}

function addLeadingZero(value) {
    return `${value}`.padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}