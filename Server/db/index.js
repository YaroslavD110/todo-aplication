const mongoose = require('mongoose');
const dbConfig = require('../config/db.config.js');
const Todo = require('./models/todo.model.js');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
    .then(() => console.log('Node app has connected to db!'))
    .catch(error => {
        console.error(error);
        process.exit();
    });

function getAllTodos(req, res) {
    Todo.find({})
        .then((todo) => {
            res.json(todo);
        })
        .catch(error => {
            res.status(500).send({
                error: error || "Some happend wrong!"
            });
        });
}

function createTodo(req, res) {

    if(!req.body._id) {
        return res.status(400).send({
            errorMessage: "Todo content can not be empty"
        });
    }

    const newTodo = new Todo(req.body);

    newTodo.save()
        .then(data => res.send(data))
        .catch(error => {
            res.status(500).send({
                errorMessage: error.message || "Some error occurred while creating new Todo!"
            });
        });
}

function editTodo(req, res) {
    if(!req.params.id) {
        return res.status(400).send({
            errorMessage: "Todo can not be find!"
        });
    }

    Todo.findByIdAndUpdate(req.params.id, req.body)
        .then(todo => {
            if(!todo) {
                return res.status(400).send({
                    errorMessage: "Todo can not be edited!"
                });
            }
            res.send(todo);
        })
        .catch(error => {
            res.status(500).send({
                errorMessage: error.message || "Todo can not be edited!"
            });
        });
}

function deleteTodo(req, res) {
    if(!req.params.id) {
        return res.status(400).send({
            errorMessage: "Todo can not be find"
        });
    }

    Todo.findByIdAndRemove(req.params.id)
        .then(todo => {
            if(!todo) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }

            res.send(todo);
        })
        .catch(error => {
            res.status(500).send({
                errorMessage: error.message || "Filed to delete todo!"
            });
        });
}

module.exports = {
    getAllTodos,
    createTodo,
    editTodo,
    deleteTodo
};
