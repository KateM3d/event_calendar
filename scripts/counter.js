const dateForCounter = document.querySelector('.dateForCounter');

let dateMin = new Date(+new Date() + 86400 * 1000).toJSON().slice(0, 10);
dateForCounter.setAttribute('min', `${dateMin}`);

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('dateForCounter')) {
        dateForCounter.value = localStorage.getItem('dateForCounter');
        showCounting();
    }
})

const showCounting = () => {
    const aSecond = 1000;
    const aMinute = aSecond * 60;
    const anHour = aMinute * 60;
    const aDay = anHour * 24;

    let countDown = setInterval(function () {
        let now = new Date();
        let requiredDate = new Date(dateForCounter.value).setHours(0, 0, 0, 0);
        let distance = requiredDate - now;

        document.querySelector('.counter-body').innerHTML = `
        <div class="days alert alert-primary" role="alert">${Math.floor(distance / aDay)}</div>
        <div class="hours alert alert-primary" role="alert">${Math.floor((distance % aDay) / anHour)}</div>
        <div class="minutes alert alert-primary" role="alert">${Math.floor((distance % anHour) / aMinute)}</div>
        <div class="seconds alert alert-primary" role="alert">${Math.floor((distance % aMinute) / aSecond)}</div>

        <div>days</div>
        <div>hours</div>
        <div>minutes</div>
        <div>seconds</div>`;

        if (distance <= 0) {

            document.querySelector('.counter-body').innerHTML = `
        <div class="days alert alert-danger" role="alert">0</div>
        <div class="hours alert alert-danger" role="alert">0</div>
        <div class="minutes alert alert-danger" role="alert">0</div>
        <div class="seconds alert alert-danger" role="alert">0</div>

        <div>days</div>
        <div>hours</div>
        <div>minutes</div>
        <div>seconds</div>`;
            clearInterval(countDown);
        }
    }, 1000)
}

const updateCounterInStor = () => {
    localStorage.setItem('dateForCounter', dateForCounter.value);
}

dateForCounter.addEventListener('change', showCounting);
dateForCounter.addEventListener('change', updateCounterInStor);