let addMessage = document.querySelector('#in');
let addButton = document.querySelector('#add');
let todo = document.querySelector('#out');

let todoList = [],
    count = 0,
    newTodo;

if (localStorage.getItem('todo')) {
        if (localStorage.getItem(`todo`) != null) {
            todoList = JSON.parse(localStorage.getItem(`todo`));
            displayMessages();
        }
    }


addButton.addEventListener('click', function() {
    
    if (!addMessage.value) return;

    
    if(localStorage.getItem(`todo`) === null) {
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
        console.log(todoList);
        console.log(newTodo);
        todoList.push(newTodo);
        localStorage.setItem(`todo`, JSON.stringify(todoList));
        todoList = JSON.parse(localStorage.getItem(`todo`));
    }

    // todoList.push(newTodo);

    displayMessages();

    // for (let i in todoList) {
    //     localStorage.setItem(`todo`, JSON.stringify(todoList[count]));
    // }

    addMessage.value = '';

});

function displayMessages() {
    let displayMessages = '';
    if (todoList.length === 0) todo.innerHTML = '';
    todoList.forEach((item) => {
        displayMessages += `
            <li class='liLabel'>
            <div id="labelForItem" draggable="true" class="${item.important ? 'important': ''}" class="bg-secondary text-white"  ondblclick="deleteTask">${item.todo}</div>
            </li>
            `;
        todo.innerHTML = displayMessages;
    });

}

function deleteTask(i) {
   
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
            localStorage.setItem(`todo`, JSON.stringify(todoList));
        }
    });
});