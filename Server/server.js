const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { APP_PORT } = require('./config.js');
const db = require('./db');

const PORT = process.env.PORT || APP_PORT;
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '/build')));

// Main route for index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

// 404 page
app.use((req, res) => {
    res.status(404).send("<h1>Sorry, page not found!</h1>");
});

// REST API routes
app.get('/api/todos', db.getAllTodos);

app.post('/api/todos', db.createTodo);

app.put('/api/todos/edit/:id', db.editTodo);

app.delete('/api/todos/delete/:id', db.deleteTodo);

// Starting server
app.listen(PORT, () => console.log(`Server has started on port ${PORT}!`));