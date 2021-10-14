// const dragAndDrop = () => {
//     const task = document.querySelector('#labelForItem');
//     // const cells = document.querySelectorAll('.btn-lg');

//     const dragStart = function() {
//         setTimeout(() => {
//             this.classList.add('hide');
//         }, 0);
//         console.log('start')
//     };
//     const dragEnd = function() {
//         this.classList.remove('hide');
//     };

//     const dragOver = function(e) {
//         e.preventDefault();

//     };
//     const dragEnter = function(e) {
//         e.preventDefault();
//         console.log('enter')
//         this.classList.add('hovered');

//     };
//     const dragLeave = function() {
//         this.classList.remove('hovered');
//     };
//     const dragDrop = function() {
//         this.append(task);
//         this.classList.remove('hovered');

//     };

//     btns.forEach((cell) => {
//         cell.addEventListener('dragover', dragOver);
//         cell.addEventListener('dragenter', dragEnter);
//         cell.addEventListener('dragleave', dragLeave);
//         cell.addEventListener('drop', dragDrop);

//     })

//     task.addEventListener('dragstart', dragStart);
//     task.addEventListener('dragend', dragEnd);
// }

// dragAndDrop()