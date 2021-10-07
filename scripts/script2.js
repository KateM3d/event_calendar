const showGame = () => {
    document.querySelector('.planner-link').classList.remove('active');
    document.querySelector('.planner-wrapper').setAttribute('hidden', 'hidden');

    document.querySelector('.game-link').classList.add('active');
    document.querySelector('.game').removeAttribute('hidden');
}

const showPlanner = () => {
    document.querySelector('.game-link').classList.remove('active');
    document.querySelector('.game').setAttribute('hidden','hidden');

    document.querySelector('.planner-link').classList.add('active');
    document.querySelector('.planner-wrapper').removeAttribute('hidden');
}

document.querySelector('.game-link').onclick = showGame;
document.querySelector('.planner-link').onclick = showPlanner;

