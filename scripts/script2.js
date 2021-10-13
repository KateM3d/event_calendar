const showGame = () => {
    document.querySelector('.planner-link').classList.remove('active');
    document.querySelector('.planner-wrapper').setAttribute('hidden', 'hidden');

    document.querySelector('.game-link').classList.add('active');
    document.querySelector('.game').removeAttribute('hidden');
}

const showPlanner = () => {
    document.querySelector('.game-link').classList.remove('active');
    document.querySelector('.game').setAttribute('hidden', 'hidden');

    document.querySelector('.planner-link').classList.add('active');
    document.querySelector('.planner-wrapper').removeAttribute('hidden');
}

document.querySelector('.game-link').onclick = showGame;
document.querySelector('.planner-link').onclick = showPlanner;


// game

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    (firstCard.querySelector('img').alt === secondCard.querySelector('img').alt) ? disableCards(): unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * document.querySelectorAll('.memory-card').length);
        card.style.order = ramdomPos;
    });
})()

cards.forEach(card => card.addEventListener('click', flipCard));

