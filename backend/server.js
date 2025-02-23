// backend/server.js
// TODO LIST API

// Run backend server using "start node server.js"

//  server.js

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
// In-memory todos storage
app.use(cors());
app.use(express.json());
let todos = [];

// Handler for GET all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// Handler for POST new todo
app.post('/api/todos', (req, res) => {
    const todo = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };
    todos.push(todo);
    res.status(201).json(todo);
});

// Handler for PUT update todo
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos[index] = { ...todos[index], ...req.body };
        res.json(todos[index]);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Handler for DELETE todo
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
