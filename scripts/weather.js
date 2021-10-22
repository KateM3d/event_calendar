const api = {
    endpoint: "http://api.openweathermap.org/data/2.5/",
    key: "3bee69558c8b35267c7ff570ee1626d1"
}

const input = document.querySelector('#input');
const inputBtn = document.querySelector('#inputBtn');


inputBtn.addEventListener('click', giveMyCityName);

function giveMyCityName(e) {
    getInfo(input.value);
}

async function getInfo(data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
    const result = await res.json();
    displayResult(result);
}

function displayResult(result) {
    let citySelected = document.querySelector('#city');
    let temperature = document.querySelector('#temperature');

    citySelected.textContent = `${result.name},${result.sys.country}`;
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>&#176C</span>`;
}