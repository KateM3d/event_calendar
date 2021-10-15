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

// game

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let matches = 0;

document.addEventListener("DOMContentLoaded", startGame = () => {
    document.querySelector('.game-modal').setAttribute('hidden', 'hidden');

    cards.forEach(card => {
        card.addEventListener('click', flipCard);
        card.classList.remove('flip');
        card.removeAttribute('hidden', 'hidden');

        let ramdomPos = Math.floor(Math.random() * cards.length);
        card.style.order = ramdomPos;
    })

    matches = 0
    resetBoard();
})

const flipCard = event => {
    if (lockBoard) return;
    if (event.target.closest('div') === firstCard) return;

    event.target.closest('div').classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = event.target.closest('div');
        return;
    }

    secondCard = event.target.closest('div');

    checkForMatch();
}

const checkForMatch = () => {
    if (firstCard.querySelector('img').alt === secondCard.querySelector('img').alt) {
        matches += 2;

        if (matches === cards.length) {
            setTimeout(() =>
                cards.forEach(card =>
                    card.setAttribute('hidden', 'hidden')), 2000);
            setTimeout(() =>
                document.querySelector('.game-modal').removeAttribute('hidden', 'hidden'), 2500);

        } else {
            disableCards();
        }
    } else {
        unflipCards();
    }
}

const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

const unflipCards = () => {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

const resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

document.querySelector('.btn-start-again').addEventListener('click', startGame);