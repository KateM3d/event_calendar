const aSecond = 1000;
const aMinute = aSecond * 60;
const anHour = aMinute * 60;
const aDay = anHour * 24;

const dateForCounter = document.querySelector('.dateForCounter');

let dateMin = new Date(+new Date() + aDay).toJSON().slice(0, 10);
let dateMax = '2099-12-31';

dateForCounter.setAttribute('min', `${dateMin}`);
dateForCounter.setAttribute('max', `${dateMax}`);

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('dateForCounter')) {
        dateForCounter.value = localStorage.getItem('dateForCounter');
        showCounting();
    }
})

const showCounting = () => {

    let countDown = setInterval(function () {
        let now;

        if (new Date().getTimezoneOffset() > 0) {
            now = +new Date() - aDay;
        }

        if (new Date().getTimezoneOffset() <= 0 || new Date().getTimezoneOffset() === -60) {
            now = new Date();
        }

        let requiredDate = new Date(dateForCounter.value).setHours(0, 0, 0, 0);
        let distance = requiredDate - now;

        document.querySelector('.counter-body').innerHTML = `
        <div class="days main_counter_result_num" role="alert">${Math.floor(distance / aDay)}</div>
        <div class="hours  main_counter_result_num" role="alert">${Math.floor((distance % aDay) / anHour)}</div>
        <div class="minutes main_counter_result_num" role="alert">${Math.floor((distance % anHour) / aMinute)}</div>
        <div class="seconds main_counter_result_num" role="alert">${Math.floor((distance % aMinute) / aSecond)}</div>

        <div class="main_counter_result_text">days</div>
        <div class="main_counter_result_text">hours</div>
        <div class="main_counter_result_text">minutes</div>
        <div class="main_counter_result_text">seconds</div>`;

        if (distance <= 0) {

            document.querySelector('.counter-body').innerHTML = `
        <div class="days alert-danger main_counter_result_num" role="alert">0</div>
        <div class="hours alert-danger main_counter_result_num" role="alert">0</div>
        <div class="minutes alert-danger main_counter_result_num" role="alert">0</div>
        <div class="seconds alert-danger main_counter_result_num" role="alert">0</div>

        <div class="main_counter_result_text">days</div>
        <div class="main_counter_result_text">hours</div>
        <div class="main_counter_result_text">minutes</div>
        <div class="main_counter_result_text">seconds</div>`;

            clearInterval(countDown);
        }

        if (!Number(distance)) {
            clearInterval(countDown);
            document.querySelector('.counter-body').innerHTML = '';
        }
    }, 1000)
}

const updateCounterInStor = () => {
    localStorage.setItem('dateForCounter', dateForCounter.value);
}

dateForCounter.addEventListener('change', showCounting);
dateForCounter.addEventListener('change', updateCounterInStor);