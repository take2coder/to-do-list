//Selectors - this allows you to find and match a CSS selector
const todoInput = document.querySelector(".todo-input"); 
const todoButton = document.querySelector(".todo-button"); 
const todoList = document.querySelector(".todo-list"); 
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
  event.preventDefault(); //prevents the form from submitting
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo") //css class
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item"); //css class
  todoDiv.appendChild(newTodo);
  //ADD TO LOCALSTORAGE
  saveLocalTodos(todoInput.value);
  //CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn"); //css class
  todoDiv.appendChild(completedButton);
  //CHECK TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn"); 
  todoDiv.appendChild(trashButton);
  //APPEND TO LIST
  todoList.appendChild(todoDiv);
  //Clear Todo INPUT VALUE
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //DELETE TOTO
  if (item.classList[0] === "trash-btn") {
      const todo = item.parentElement;
      //ANIMATION
      todo.classList.add("fall");
      removeLocalTodos(todo);
      todo.addEventListener('transitionend', function() {
        todo.remove();
      });
    }


  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
      const todo = item.parentElement;
      todo.classList.toggle("completed"); //completed is the css class
  }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch(e.target.value) {
          case "all":
            todo.style.display = "flex";  
            break;
          case "completed":
            if(todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else{
                todo.style.display = "none";
            }
            break;
          case "uncompleted":
            if(!todo.classList.contains("completed")) {
              todo.style.display = "flex";
          } else{
              todo.style.display = "none";
          }
          break;
      }
    });
}

function saveLocalTodos(todo) {
  //CHECK - do I already have a todo, if not create an array, if so, add it and save to local storage.
  let todos; 
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
      todos = JSON.parse(localStorage.getItem("todos")); //if there is already something there, I'm going to take (parse) it back to an array
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
  todos = JSON.parse(localStorage.getItem("todos")); //if there is already something there, I'm going to take (parse) it back to an array
  }
  todos.forEach(function(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo") //css class
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item"); //css class
    todoDiv.appendChild(newTodo);
    
    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn"); //css class
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn"); 
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);


  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1); //what index item to remove, how many 
  localStorage.setItem("todos", JSON.stringify(todos));
}