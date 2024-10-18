let missionCount = 0;
let inputField= document.querySelector(".to-do-input");
let addButton = document.querySelector(".add-button");
const listContainer = document.querySelector('.upper-list');
document.addEventListener('DOMContentLoaded', reload);

function reload (){
    listContainer.innerHTML = '';
    if(localStorage.getItem("todos")===null) {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    todos.map((e) => {
    const li= document.createElement('li');
    li.className = 'list-item';
    li.setAttribute('title','text');
    li.textContent= e;
    const box=document.createElement('div');
    box.className = 'check-box';
    box.setAttribute('style','cursor:pointer; width:100px; height:25px; text-align:center; background-color:whitesmoke; border: 3px solid black; margin: 10px auto;');
    box.innerHTML='<i class="fa-solid fa-check"></i>';
    li.appendChild(box);
    const remove=document.createElement('div');
    remove.className = 'delete-box';
    remove.innerHTML = '<i class="fa-solid fa-trash"></i>';
    li.appendChild(remove);
    listContainer.appendChild(li);
    /*ekledikten sonra kalan görev sayısını güncelliyor*/
    missionCount++;
    document.querySelector('.remain-text').innerHTML= missionCount + "  remain mission";
    
    
    /* remove buton fonksiyonu*/
    remove.addEventListener('click',function(){
        document.querySelector('.upper-list').removeChild(li);
        if(box.style.backgroundColor === 'whitesmoke'){
            missionCount--;
        };
        
        document.querySelector('.remain-text').innerHTML= missionCount + "  remain mission";

        checklocal(); 
    const içerik= todos.indexOf(li.textContent);
    if (içerik> -1) {
        todos.splice(içerik, 1);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    
    });
    
    /* check buton fonksiyonu*/
    box.addEventListener('click',function(){
        if(box.style.backgroundColor === 'whitesmoke'){
            box.style.backgroundColor='green';
            li.style.textDecoration= 'line-through';
            missionCount--;
            document.querySelector('.remain-text').innerHTML= missionCount + "  remain mission";
        }
     else{
         box.style.backgroundColor= 'whitesmoke';
         li.style.textDecoration= 'none';
         missionCount++;
         document.querySelector('.remain-text').innerHTML= missionCount + "  remain mission";
        };
    });    
        console.log(e);
    });
    setListItemEvents();
};

function checklocal() {
    !(localStorage.getItem("todos")) ? 
        todos = [] :
        todos = JSON.parse(localStorage.getItem("todos"));
};

function addtolocal() {
    checklocal();
    todos.push(inputField.value);
    localStorage.setItem("todos",JSON.stringify(todos));
};

function main() {

    const li= document.createElement('li');
    li.className = 'list-item';
    li.textContent= inputField.value;
    const box=document.createElement('div');
    box.className = 'check-box';
    box.setAttribute('style','cursor:pointer; width:100px; height:25px; text-align:center; background-color:whitesmoke; border: 3px solid black; margin: 10px auto;');
    box.innerHTML='<i class="fa-solid fa-check"></i>';
    li.appendChild(box);
    const remove=document.createElement('div');
    remove.className = 'delete-box';
    remove.innerHTML = '<i class="fa-solid fa-trash"></i>';
    li.appendChild(remove);
    listContainer.appendChild(li);
    
    
    /*ekledikten sonra kalan görev sayısını güncelliyor*/
    missionCount++;
    document.querySelector('.remain-text').innerHTML= missionCount + "  remain mission";
    
    
    /* remove buton fonksiyonu*/
    remove.addEventListener('click',function(){
        document.querySelector('.upper-list').removeChild(li);
        if(box.style.backgroundColor === 'whitesmoke'){
            missionCount--;
        };
        
        document.querySelector('.remain-text').innerHTML= missionCount + "  remain mission";
        checklocal();
    const içerik= todos.indexOf(li.textContent);
    if(içerik> -1) {
        todos.splice(içerik, 1);
    }
    localStorage.setItem("todos", JSON.stringify(todos)); 
    });
    
    /* check buton fonksiyonu*/
    box.addEventListener('click',function(){
        if(box.style.backgroundColor === 'whitesmoke'){
            box.style.backgroundColor='green';
            li.style.textDecoration= 'line-through';
            missionCount--;
            document.querySelector('.remain-text').innerHTML= missionCount + "  remain mission";
        }
     else{
         box.style.backgroundColor= 'whitesmoke';
         li.style.textDecoration= 'none';
         missionCount++;
         document.querySelector('.remain-text').innerHTML= missionCount + "  remain mission";
        };
    });    
    setListItemEvents();
};

const updateTodo = (index) => {

};

const addNewTodo = (e) => {
    console.log("Buton:", addButton.innerText)
    if(inputField.value != ""){
        if (addButton.innerText == "Add") {
            main();
            addtolocal();
            /*değer girdikten sonra inputun içini temizliyor */
            inputField.value = "";
        } else {
            console.log("Data update:", addButton.dataset.update);
            todos[addButton.dataset.update] = inputField.value;
            localStorage.setItem("todos", JSON.stringify(todos));
            addButton.innerText = "Add";
            inputField.value = "";
            reload();
        }
    };
 }

 addButton.addEventListener('click', addNewTodo);

document.addEventListener('keyup', function(e){
    if(e.keyCode == 13){
        addNewTodo();
    };
});

const setListItemEvents = () => {
    document.querySelectorAll(".list-item").forEach((listItem)=> {
        listItem.addEventListener("click", () => {
            console.log("Event triggerlandı.", listItem.innerText);
            console.log("Todos: ", todos.indexOf(listItem.innerText));
            inputField.value = listItem.innerText;
            addButton.innerText = "Update";
            addButton.setAttribute('data-update', todos.indexOf(listItem.innerText));
            inputField.focus();
        });
    })
};