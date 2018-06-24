const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const appConfig = require('./config/app.config.js');
const db = require('./db');

const PORT = process.env.PORT || appConfig.port;
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

// REST API routes
app.get('/todos', db.getAllTodos);

app.post('/todos', db.createTodo);

app.put('/edit/:id', db.editTodo);

app.delete('/delete/:id', db.deleteTodo);

// Starting server
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}!`);
});