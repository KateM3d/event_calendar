window.onload=function(){

    let toDoList=[];
if(localStorage.getItem('toDo')!=undefined){
    toDoList=JSON.parse(localStorage.getItem('toDo'));
    out();
}

    document.getElementById('add').onclick=function(){
        let d=document.getElementById('in').value;
        
        if (!d) return;
        let str = d.replace(/(купить торт|купить конфеты|купить сладкое)/gi, 'ты сладкая и без сладкого');

        let temp={};
        temp.toDo=str;
        let i=toDoList.length;
        toDoList[i]=temp;
        console.log( toDoList)
        out();
        localStorage.setItem('toDo',JSON.stringify(toDoList));
    }


    function out(){
        let out="";
        for(let key in toDoList){
            out+=toDoList[key].toDo+'<br>';
        }
        document.getElementById('out').innerHTML=out;
    }
}