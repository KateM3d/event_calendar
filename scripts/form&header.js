document.addEventListener('DOMContentLoaded', checkUserInfo = () => {
    if (!localStorage.getItem('userName')) {
        showForm();
    } else {
        document.querySelector('.header').removeAttribute('hidden', 'hidden');
        document.querySelector('.main').removeAttribute('hidden', 'hidden');
        showQuote();
        showGreeting();
    }
})

const showGreeting = () => {
    let greeting = getGreeting();
    userName = userName ?? localStorage.getItem('userName');

    document.querySelector('.greeting').textContent = `${greeting}, ${userName}!`;
}

const getGreeting = () => {
    let hours = new Date().getHours();

    if (hours >= 0 && hours <= 5) {
        return "Good night";
    } else if (hours >= 6 && hours <= 11) {
        return "Good morning";
    } else if (hours >= 12 && hours <= 17) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

const updateLocal = () => {
    localStorage.setItem('userName', userName);
    localStorage.setItem(`userCity`, userCity)
}

const showForm = () => {
    document.querySelector('.card').style.margin = 'auto';

    document.querySelector('.card').removeAttribute('hidden', 'hidden');
}

let userName;
let city;

const checkForm = () => {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    form.classList.add('was-validated');
                    return;
                }
                event.preventDefault();
                event.stopPropagation();

                userName = document.getElementById('validationTooltip01').value;
                userName = userName[0].toUpperCase() + userName.slice(1).toLowerCase();
                city = document.getElementById('validationTooltip03').value;

                form.classList.add('was-validated');
                showInterface();
                showQuote(); 
                showGreeting();
                updateLocal();
            }, false)
        })
}

const showInterface = () => {
    document.querySelector('.card').setAttribute('hidden', 'hidden');
    document.querySelector('.header').removeAttribute('hidden', 'hidden');
    document.querySelector('.main').removeAttribute('hidden', 'hidden');
}

const showQuote = () => {
    fetch('https://favqs.com/api/qotd')
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
            document.querySelector('.blockquote__text').innerText = obj.quote.body;
            document.querySelector('figcaption').innerText = obj.quote.author;
        })
        .catch(error => {
            error = new Error('Failed to fetch');
            document.querySelector('blockquote').innerText = error.message;
        });
}

document.querySelector('.form-btn').addEventListener('click', checkForm)