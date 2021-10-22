let showDate = document.querySelector('.date');

window.addEventListener('DOMContentLoaded', () => {

    const myDate = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = days[myDate.getDay()];
    let todaysDate = myDate.getDate();
    let month = months[myDate.getMonth()];
    let year = myDate.getFullYear();

    showDate.textContent = `${day}, ${todaysDate} ${month} ${year}`;
})