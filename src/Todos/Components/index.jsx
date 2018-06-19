import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddTodoButton from '../Containers/AddTodoButton';
import TodosList from './TodosList';
import TodoForm from './TodoForm';
import Todo from './Todo';

import getTodoById from '../utils/getTodoById';
import transformTodos from '../utils/transformTodos';
import { successMessage, warningMessage } from '../utils/uiMessages';

import '../todos.css';

class Todos extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
    };

    state = {
        todos: transformTodos(this.props.todos),
        showForm: false,
    };

    getActiveTodo = () => this.state.todos.find( todo => todo.isActive === true);

    toggleActiveTodo = (todoId) => {
        this.setState( prevState => {
            return {
                todos: prevState.todos.map( todo => {
                    if(todo.id === todoId) {
                        return {...todo, isActive: true}
                    } else if(todo.id === this.getActiveTodo().id) {
                        return {...todo, isActive: false}
                    } else {
                        return todo;
                    }
                }),
                showForm: (prevState.showForm) ? false : prevState.showForm,
            };
        });
    };

    toggleTodoRejecting = (todoId) => {
        this.setState( prevState => {
            return { todos: prevState.todos.map( todo => {
                return (todo.id === todoId)
                    ? ({...todo, isRejected: !todo.isRejected})
                    : todo
            })};
        });
    };

    toggleTodoDoneStatus = (todoId) => {
        let currentTodo = getTodoById(this.state.todos, todoId);

        if(!currentTodo.isRejected) {
            this.setState( prevState => {
                return { todos: prevState.todos.map( todo => {
                    return (todo.id === todoId)
                        ? ({...todo, isDone: !todo.isDone})
                        : todo
                })};
            });
        }
    };

    toggleForm = () => {
        this.setState( prevState => {
            return { showForm: !prevState.showForm }
        });
    };

    addTodo = (todo) => {
        this.setState( prevState => {
            let newTodos = prevState.todos.map( todo => (todo.isActive) ? {...todo, isActive: false} : todo );
            return { todos: [...newTodos, todo] };
        });

        successMessage('Todo success added!');

        this.toggleForm();
    };

    deleteTodo = (todoId) => {
        this.setState( prevState => {
            if(todoId === this.getActiveTodo().id) {
                let newTodos = prevState.todos.filter(todo => todo.id !== todoId);
                if(newTodos.length > 0) { newTodos[0].isActive = true; }
                return { todos: newTodos };
            } else { return { todos: prevState.todos.filter(todo => todo.id !== todoId) } }
        });

        warningMessage('Todo deleted!');
    };

    render() {
        const { todos, showForm } = this.state;

        window.todos = todos;

        return (
            <div className="todos-wrap">
                <TodosList
                    todos={todos}
                    toggleActiveTodo={this.toggleActiveTodo}
                    deleteTodo={this.deleteTodo}
                />
                { (showForm || (todos.length < 1))
                    ? <TodoForm
                        addTodo={this.addTodo}
                    />
                    : <Todo
                        activeTodo={this.getActiveTodo()}
                        toggleTodoRejecting={this.toggleTodoRejecting}
                        toggleTodoDoneStatus={this.toggleTodoDoneStatus}
                        deleteTodo={this.deleteTodo}
                    />
                }

                <AddTodoButton toggleForm={this.toggleForm} />
            </div>
        );
    }
}

export default Todos;