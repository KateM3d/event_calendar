const addMessage = document.querySelector('#in');
const addButton = document.querySelector('#add');
const todo = document.querySelector('#out');

let todoList = [],
    count = 0,
    newTodo;

const displayMessages = () => {
    let displayMessages = '';
    if (todoList.length === 0) todo.innerHTML = '';

    todoList.forEach((item, i) => {
        displayMessages += `
                <li class='liLabel' id="${+item.id}">
                <div id="labelForItem" draggable="true" class="${item.important ? 'important': ''}" class="bg-secondary text-white"  ondblclick="deleteTask(${i})">${item.todo}</div>
                </li>
                `;
        todo.innerHTML = displayMessages;
    });
}

const showTodoFromStor = () => {
    if(localStorage.getItem('todo')) {
        todoList = JSON.parse(localStorage.getItem(`todo`));
        displayMessages();
    }
}

const addNewTodo = () => {
    if (!addMessage.value) return;

    if (localStorage.getItem(`todo`) === null) {
        newTodo = {
            id: count,
            todo: addMessage.value,
            important: false,
        };
        localStorage.setItem(`todo`, JSON.stringify([newTodo]));
        todoList = JSON.parse(localStorage.getItem(`todo`));
    } else {
        todoList = JSON.parse(localStorage.getItem(`todo`));
        count = todoList.length;
        newTodo = {
            id: count++,
            todo: addMessage.value,
            important: false,
        };
        todoList.push(newTodo);
        localStorage.setItem(`todo`, JSON.stringify(todoList));
        todoList = JSON.parse(localStorage.getItem(`todo`));
    }
    displayMessages();
    addMessage.value = '';
};

const deleteTask = i => {
    todoList.splice(i, 1);
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(`todo`) != null) {
            localStorage.removeItem(`todo`);
        }
    }
    for (let i = 0; i < todoList.length; i++) {
        localStorage.setItem(`todo`, JSON.stringify(todoList));
    }

    displayMessages();
}

/* todo.addEventListener('click', function (event) {
    event.preventDefault();
    todoList.forEach(function (item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem(`todo`, JSON.stringify(todoList));
        }
    });
}); */

addButton.addEventListener('click', addNewTodo);
document.addEventListener('DOMContentLoaded', showTodoFromStor);