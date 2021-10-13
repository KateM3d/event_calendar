// function for the dragANdDrop part. Waiting for calendar and complete todo

const dragAndDrop = () => {
    const task = document.querySelector('.taskCard');
    const dateCells = document.querySelector('.callendarCell');

    const dragStart = () => {
        setTimeout(() => {
            this.classList.add('hide');
        }, 0);
    };
    const dragEnd = () => {
        this.classList.remove('hide');
    };

    const dragOver = (e) => {
        e.preventDefault();
    };
    const dragEnter = () => {
        setTimeout(() => {
            this.classList.add('hovered');
        }, 0);
    };
    const dragLeave = () => {
        this.classList.remove('hovered');
    };
    const dragDrop = () => {
        this.append(task);
        this.classList.remove('hovered');

    };

    dateCells.forEach((cell) => {
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('dragenter', dragEnter);
        cell.addEventListener('dragleave', dragLeave);
        cell.addEventListener('drop', dragDrop);

    })
}