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
        important: false
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo',JSON.stringify(todoList));
    addMessage.value='';
});

function displayMessages(){
    let displayMessages='';
if(todoList.length===0)todo.innerHTML='';
    todoList.forEach(function(item, i){
displayMessages += `
<li>
<div id="lebelForItem" class="${item.important ? 'important': ''}" class="bg-secondary text-white">${item.todo}</div>
</li>
`;
todo.innerHTML=displayMessages;
    });
}

todo.addEventListener('contextmenu',function(event){
    event.preventDefault();
todoList.forEach(function(item,i){
    if(item.todo===event.target.innerHTML){
        if(event.ctrlKey || event.metaKey){
            todoList.splice(i,1);
        } else{
            item.important=!item.important;
        }   
        displayMessages();
        localStorage.setItem('todo',JSON.stringify(todoList));
    }
});
});

// KATE

document.addEventListener("DOMContentLoaded", showQuote = () => {
    fetch('https://favqs.com/api/qotd')
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
            document.querySelector('.blockquote__text').innerText = obj.quote.body;
            document.querySelector('figcaption').innerText = obj.quote.author;
        })
        .catch(error => {
            error = new Error('Failed to fetch');
            document.querySelector('blockquote').innerText = error.message;
        });
})
