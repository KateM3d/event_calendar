let addMessage = document.querySelector('#in');
let addButton = document.querySelector('#add');
let todo = document.querySelector('#out');

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}



addButton.addEventListener('click', function() {
    if (!addMessage.value) return;

    let newTodo = {
        todo: addMessage.value,
        important: false
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';

});

function displayMessages() {
    let displayMessages = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i) {
        displayMessages += `
<li>
<div id="labelForItem"  class="${item.important ? 'important': ''}" class="bg-secondary text-white"  ondblclick="deleteTask(${i})">${item.todo}</div>
</li>
`;
        todo.innerHTML = displayMessages;
    });

}

function deleteTask(i) {

    todoList = JSON.parse(localStorage.getItem('todo'));
    todoList.splice(i, 1);
    localStorage.setItem('todo', JSON.stringify(todoList));
    displayMessages();
};


todo.addEventListener('click', function(event) {
    event.preventDefault();
    todoList.forEach(function(item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});



const dragAndDrop = function() {
    const task = document.querySelector('#labelForItem');
    const dateCells = document.querySelector('.card-body');

    const dragStart = function() {
        setTimeout(() => {
            this.classList.add('hide');
        }, 0);
    };
    const dragEnd = function() {
        this.classList.remove('hide');
    };

    const dragOver = function(e) {
        e.preventDefault();
    };
    const dragEnter = function() {
        setTimeout(() => {
            this.classList.add('hovered');
        }, 0);
    };
    const dragLeave = function() {
        this.classList.remove('hovered');
    };
    const dragDrop = function() {
        this.append(task);
        this.classList.remove('hovered');

    };

    dateCells.forEach((cell) => {
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('dragenter', dragEnter);
        cell.addEventListener('dragleave', dragLeave);
        cell.addEventListener('drop', dragDrop);

    })

    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);
}

dragAndDrop()