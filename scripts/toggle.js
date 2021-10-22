const showContent = (event) => {

    for (let li of document.querySelector('.nav').querySelectorAll('li')) {
        li.classList.remove('active');
    }

    event.target.classList.add('active');

    for (let i = 1; i < document.querySelector('.main').children.length; i++) {
        document.querySelector('.main').children[i].setAttribute('hidden', 'hidden');
    }

    for (let i = 0; i < document.querySelector('.nav').querySelectorAll('li').length; i++) {
        if (document.querySelector('.nav').querySelectorAll('li')[i] == event.target) {
            document.querySelector('.main').children[i + 1].removeAttribute('hidden');

            break;
        }
    }
}

for (let li of document.querySelector('.nav').querySelectorAll('li')) {
    li.addEventListener('click', showContent);
}