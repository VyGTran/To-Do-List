const body = document.body;
const input = document.querySelector('input[type=text]');
const overlay = document.querySelector('.overlay');
function showFloater() {
    body.classList.add('show-floater');
}
function closeFloater() {
    if (body.classList.contains('show-floater')) {
        body.classList.remove('show-floater');
    }
}
input.addEventListener('focusin', showFloater);
overlay.addEventListener('click', closeFloater);
const todoList = document.querySelector('.todo-list');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('input[type=text]');
const todos = JSON.parse(localStorage.getItem('todos')) || [];
fillTodosList(todos);
function createTodo(event) {
    event.preventDefault();
    const title = todoInput.value;
    const todo = {
        title: title
    };
    todos.push(todo)
    fillTodosList(todos);
    storeTodos(todos);
    todoForm.reset();
}
function fillTodosList(todos = []) {
    let todosHTML = todos.map((todo) => {
        return`
        <div class="todo" id="todo">
        <div class="title">${todo.title}</div>
        <span class="glyphicon glyphicon-remove"></span>
        </div>
        `;
    }).join('');
    todoList.innerHTML = todosHTML;
}
function removeTodo(e) {
    if(!e.target.matches('.glyphicon-remove')) return;
    const index = e.target.parentNode.dataset.id;
    todos.splice(index, 1);
    fillTodosList(todos);
    storeTodos(todos);
}
function storeTodos(todos = []) {
    localStorage.setItem('todos', JSON.stringify(todos))
}
function checkDone(e) {
     if(e.target.matches('.title')) {
         e.target.classList.toggle('checked');
     }
}
todoList.addEventListener('click', checkDone);
todoForm.addEventListener('submit', createTodo);
todoList.addEventListener('click', removeTodo)

