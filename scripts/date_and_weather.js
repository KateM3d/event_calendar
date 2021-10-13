//date

let showDate = document.querySelector('.date');

function getTodaysDate() {
    const myDate = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = days[myDate.getDay()];
    let todaysDate = myDate.getDate();
    let month = months[myDate.getMonth()];
    let year = myDate.getFullYear();


    showDate.textContent = `${day}, ${todaysDate} ${month} ${year}`;

}

getTodaysDate();


///weather
const api = {
    endpoint: "http://api.openweathermap.org/data/2.5/",
    key: "3bee69558c8b35267c7ff570ee1626d1"
}

//city input field 
const input = document.querySelector('#input');
//city input field Btn
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