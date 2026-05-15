const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

const API_URL = '/api/todos';

async function fetchTodos() {
    try {
        const res = await fetch(API_URL);
        const todos = await res.json();
        renderTodos(todos);
    } catch (err) {
        console.error('Error fetching todos:', err);
    }
}

async function addTodo() {
    const task = todoInput.value.trim();
    if (!task) return;

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        });
        todoInput.value = '';
        fetchTodos();
    } catch (err) {
        console.error('Error adding todo:', err);
    }
}

async function deleteTodo(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTodos();
    } catch (err) {
        console.error('Error deleting todo:', err);
    }
}

function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.task}</span>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

fetchTodos();
