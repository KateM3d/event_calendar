<<<<<<< HEAD

const showContent = (event) => {

    event.target.classList.add('active');

    document.querySelectorAll('.header_menu_li').forEach((nav, index) => {
        if(nav !== event.target) {
            nav.classList.remove('active');
        }

        let indexMenu;
        document.querySelectorAll('.main_screen').forEach((screen, index) => {
            console.log(screen, index);
            return indexMenu = index;
        })

        console.log(index, indexMenu)

        if(index-1 !== indexMenu) {
            document.querySelectorAll('.main_screen')[index].setAttribute('hidden', 'hidden');
        } else document.querySelectorAll('.main_screen')[indexMenu].removeAttribute('hidden')
})
    
    

    for (let i = 0; i < document.querySelectorAll('.header_menu_li').length; i++) {
        if (document.querySelectorAll('.header_menu_li')[i] == event.target) {
            document.querySelector('.main').children[i].removeAttribute('hidden');
            break;
        }
    }
}

for (let li of document.querySelectorAll('.header_menu_li')) {
    li.addEventListener('click', showContent);
}

// game

const cards = document.querySelectorAll('.memory-card');

=======
>>>>>>> 71d5429ec15a246ed32bd109b73fc34be38b3a24
let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let matches = 0;

const cardsList = {
    front: [{
            src: 'images/cat.png',
            alt: "cat"
        },
        {
            src: 'images/dog.png',
            alt: "dog"
        },
        {
            src: 'images/girl.png',
            alt: "girl"
        },
        {
            src: 'images/car.png',
            alt: "car"
        },
        {
            src: 'images/apple.png',
            alt: "apple"
        },
        {
            src: 'images/fish.png',
            alt: "fish"
        }
    ],
    back: {
        src: 'images/question.png',
        alt: "question"
    }
};

const startGame = () => {
    document.querySelector('.game-wrapper').innerHTML = `
                <div class="text-center game-modal" hidden>
                    <div class="card-body">
                        <h5 class="card-title mb-3">You WON!</h5>
                        <button class="btn-start-again">Tap here to play again</button>
                    </div>
                </div>`;

    for (let i = 0; i < cardsList.front.length; i++) {
        document.querySelector('.game-wrapper').innerHTML += `
                <div class="memory-card">
                    <img class="front-face" src=${cardsList.front[i].src} alt=${cardsList.front[i].alt}>
                    <img class="back-face" src=${cardsList.back.src} alt=${cardsList.back.alt}>
                </div>

                <div class="memory-card">
                    <img class="front-face" src=${cardsList.front[i].src} alt=${cardsList.front[i].alt}>
                    <img class="back-face" src=${cardsList.back.src} alt=${cardsList.back.alt}>
                </div>
    `;
    }

    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', flipCard);
        card.classList.remove('flip');
        card.removeAttribute('hidden', 'hidden');

        let ramdomPos = Math.floor(Math.random() * document.querySelectorAll('.memory-card').length);
        card.style.order = ramdomPos;
    })

    matches = 0;
    resetBoard();
}

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

        if (matches === document.querySelectorAll('.memory-card').length) {
            setTimeout(() =>
                document.querySelectorAll('.memory-card').forEach(card =>
                    card.setAttribute('hidden', 'hidden')), 2000);
            setTimeout(() => {
                document.querySelector('.game-modal').removeAttribute('hidden', 'hidden');
                document.querySelector('.btn-start-again').addEventListener('click', startGame);
            }, 2500);

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

document.addEventListener('DOMContentLoaded', startGame);