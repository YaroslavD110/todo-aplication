import React, { Component, Fragment } from "react";

import AddTodoButton from "../Containers/AddTodoButton";
import TodosList from "./TodosList";
import TodoForm from "./TodoForm";
import TodoFilter from "./TodoFilter";
import Todo from "../Containers/Todo";

import getTodoById from "../utils/getTodoById";
import transformTodos from "../utils/transformTodos";
import transformId from "../utils/transformId";
import {
  successMessage,
  warningMessage,
  errorMessage,
  infoMessage
} from "../utils/uiMessages";
import { REST_API_URI } from "../../config";

import "../todos.css";
import Loader from "../utils/loader";

class Todos extends Component {
  state = {
    todos: [],
    filtredTodos: null,
    showForm: false,
    isPreloader: true
  };

  getActiveTodo = () => this.state.todos.find(todo => todo.isActive === true);

  filterTodos = newTodos => this.setState({ filtredTodos: newTodos });

  toggleActiveTodo = todoId => {
    this.setState(prevState => {
      return {
        todos: prevState.todos.map(todo => {
          if (todo.id === todoId) {
            return { ...todo, isActive: true };
          } else if (todo.id === this.getActiveTodo().id) {
            return { ...todo, isActive: false };
          } else {
            return todo;
          }
        }),
        showForm: prevState.showForm ? false : prevState.showForm
      };
    });
  };

  toggleTodoRejecting = todoId => {
    let newTodos = this.state.todos.map(todo => {
      return todo.id === todoId
        ? { ...todo, isRejected: !todo.isRejected }
        : todo;
    });

    fetch(`${REST_API_URI}/todos/edit/${todoId}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        transformId(newTodos.find(todo => todo.id === todoId))
      )
    })
      .then(res => {
        if (res.errorMessage) {
          errorMessage(res.errorMessage);
        } else {
          this.setState({ todos: newTodos }, () => {
            infoMessage(
              `"${
                getTodoById(newTodos, todoId).title
              }" reject status was changed!`
            );
          });
        }
      })
      .catch(error => {
        console.error(error);
        errorMessage("Filed toggle todo status!");
      });
  };

  toggleTodoDoneStatus = todoId => {
    let currentTodo = getTodoById(this.state.todos, todoId);
    let newTodos = this.state.todos.map(todo => {
      return todo.id === todoId ? { ...todo, isDone: !todo.isDone } : todo;
    });

    if (!currentTodo.isRejected) {
      fetch(`${REST_API_URI}/todos/edit/${todoId}`, {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          transformId(newTodos.find(todo => todo.id === todoId))
        )
      })
        .then(res => {
          if (res.errorMessage) {
            errorMessage(res.errorMessage);
          } else {
            this.setState({ todos: newTodos }, () => {
              infoMessage(
                `"${
                  getTodoById(newTodos, todoId).title
                }" done status was changed!`
              );
            });
          }
        })
        .catch(error => {
          console.error(error);
          errorMessage("Filed toggle todo status!");
        });
    }
  };

  toggleForm = () => {
    this.setState(prevState => {
      return { showForm: !prevState.showForm };
    });
  };

  addTodo = todo => {
    fetch(`${REST_API_URI}/todos`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transformId(todo))
    })
      .then(res => res.json())
      .then(res => {
        if (res.errorMessage) {
          errorMessage(res.errorMessage);
        } else {
          this.setState(prevState => {
            let newTodos = prevState.todos.map(
              todo => (todo.isActive ? { ...todo, isActive: false } : todo)
            );
            return { todos: [...newTodos, todo] };
          });
          successMessage("Todo success added!");
          this.toggleForm();
        }
      })
      .catch(error => {
        console.error(error);
        errorMessage("Filed to create new todo!");
      });
  };

  deleteTodo = todoId => {
    fetch(`${REST_API_URI}/todos/delete/${todoId}`, { method: "delete" })
      .then(res => res.json())
      .then(res => {
        if (res.errorMessage) {
          errorMessage(res.errorMessage);
        } else {
          this.setState(prevState => {
            if (todoId === this.getActiveTodo().id) {
              let newTodos = prevState.todos.filter(todo => todo.id !== todoId);
              if (newTodos.length > 0) {
                newTodos[0].isActive = true;
              }
              return { todos: newTodos };
            } else {
              return {
                todos: prevState.todos.filter(todo => todo.id !== todoId)
              };
            }
          });

          warningMessage("Todo deleted!");
        }
      })
      .catch(error => {
        console.error(error);
        errorMessage("Filed to delete todo!");
      });
  };

  componentDidMount() {
    fetch(`${REST_API_URI}/todos`)
      .then(res => res.json())
      .then(todos => {
        this.setState({ isPreloader: false, todos: transformTodos(todos) });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isPreloader: false }, () => {
          errorMessage("You have not todos yet!");
        });
      });
  }

  render() {
    const { todos, showForm, isPreloader, filtredTodos } = this.state;

    return (
      <div className="todos-wrap">
        {isPreloader ? (
          <div className="cover">
            <Loader />
          </div>
        ) : (
          <Fragment>
            <TodosList
              todos={filtredTodos || todos}
              toggleActiveTodo={this.toggleActiveTodo}
              deleteTodo={this.deleteTodo}
            />
            <div className="todos-screen">
              <TodoFilter todos={todos} filterTodos={this.filterTodos} />
              {showForm || todos.length < 1 ? (
                <TodoForm addTodo={this.addTodo} />
              ) : (
                <Todo
                  activeTodo={this.getActiveTodo()}
                  toggleTodoRejecting={this.toggleTodoRejecting}
                  toggleTodoDoneStatus={this.toggleTodoDoneStatus}
                  deleteTodo={this.deleteTodo}
                />
              )}
              <AddTodoButton toggleForm={this.toggleForm} />
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Todos;
