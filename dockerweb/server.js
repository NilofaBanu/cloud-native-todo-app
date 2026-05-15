const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Path to JSON file
const dataFile = path.join(__dirname, "data.json");

// Helper function to read todos
function readTodos() {
    if (!fs.existsSync(dataFile)) return [];
    const data = fs.readFileSync(dataFile);
    return JSON.parse(data);
}

// Helper function to save todos
function saveTodos(todos) {
    fs.writeFileSync(dataFile, JSON.stringify(todos, null, 2));
}

// Get all todos
app.get("/api/todos", (req, res) => {
    const todos = readTodos();
    res.json(todos);
});

// Add a todo
app.post("/api/todos", (req, res) => {
    const { task } = req.body;
    const todos = readTodos();

    const newTodo = {
        id: Date.now(),
        task,
        completed: false
    };

    todos.push(newTodo);
    saveTodos(todos);

    res.status(201).json(newTodo);
});

// Delete a todo
app.delete("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    let todos = readTodos();

    todos = todos.filter(todo => todo.id !== id);
    saveTodos(todos);

    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
