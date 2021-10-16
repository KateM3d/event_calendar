let addMessage = document.querySelector('#in');
let addButton = document.querySelector('#add');
let todo = document.querySelector('#out');

let todoList = [];

if (localStorage.getItem('todo0')) {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(`todo${i}`) != null) {
            todoList.push(JSON.parse(localStorage.getItem(`todo${i}`)));
        }
    }

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
    for (let i in todoList) {
        localStorage.setItem(`todo${i}`, JSON.stringify(todoList[i]));
    }

    addMessage.value = '';

});

function displayMessages() {
    let displayMessages = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i) {
        displayMessages += `
<li id='liLabel'>
<div id="labelForItem" draggable="true" class="${item.important ? 'important': ''}" class="bg-secondary text-white"  ondblclick="deleteTask(${i})">${item.todo}</div>
</li>
`;
        todo.innerHTML = displayMessages;
    });

}

function deleteTask(i) {
   
    todoList.splice(i, 1);
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(`todo${i}`) != null) {
            localStorage.removeItem(`todo${i}`);
        }
    }
    for (let i = 0; i < todoList.length; i++) {
        localStorage.setItem(`todo${i}`, JSON.stringify(todoList[i]));
    }
 displayMessages();
}



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
            localStorage.setItem(`todo${i}`, JSON.stringify(todoList[i]));
        }
    });
});