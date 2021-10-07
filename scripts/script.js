let addMessage = document.querySelector('#in');
let addButton = document.querySelector('#add');
let todo=document.querySelector('#out');

let todoList=[];

if(localStorage.getItem('todo')){
    todoList=JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', function () {
    if(!addMessage.value)return;

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo',JSON.stringify(todoList));
    addMessage.value='';
});

function displayMessages(){
    let displayMessages='';

    todoList.forEach(function(item, i){
displayMessages += `
<li>
<div class="form-check">
<input type='checkbox' class="form-check-input" id='item_${i}' ${item.chacked ? 'checked' : ''}>
<lebel id="lebelForItem" for='item_${i}' class="${item.important ? 'important': ''}">${item.todo}</lebel>
</div></li>
`;
todo.innerHTML=displayMessages;
    });
}

todo.addEventListener('change',function(event){
    let idInput=event.target.getAttribute('id');
let valueLabel=todo.querySelector('[for='+idInput+']').innerHTML;

todoList.forEach(function(item){
    if(item.todo===valueLabel){
        item.checked=!item.checked;
        localStorage.setItem('todo',JSON.stringify(todoList));
    }
});
});

todo.addEventListener('contextmenu',function(event){
    event.preventDefault();
todoList.forEach(function(item){
    if(item.todo===event.target.innerHTML){
        item.important=!item.important;
        displayMessages();
        localStorage.setItem('todo',JSON.stringify(todoList));
    }
});
});