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