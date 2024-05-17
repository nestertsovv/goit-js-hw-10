import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formElem = document.querySelector(".form");
const delayElem = formElem.elements.delay;

formElem.addEventListener("submit", (e) => {
    e.preventDefault();

    const delay = delayElem.value;
    const state = [...formElem.elements.state].find(elem => elem.checked);
    const stateValue = state.value;

    if (delay >= 0) {
        createPromise(stateValue, delay);
        state.checked = false;
        delayElem.value = "";
    } else {
        iziToast.error({
            message: 'Value must be greater than or equal to 0',
            position: 'topRight',
            transitionIn: 'fadeIn',
        });
    }
})

function createPromise(state, delay) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });

    promise
        .then((value) => {
            iziToast.show({
                message: value,
                color: 'green',
                position: 'topRight',
                transitionIn: 'fadeIn',
            });
        })
        .catch((error) => {
            iziToast.show({
                message: error,
                color: 'red',
                position: 'topRight',
                transitionIn: 'fadeIn',
            });
        });
}