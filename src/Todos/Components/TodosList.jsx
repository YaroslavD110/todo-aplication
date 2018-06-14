import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import TodosListItem from '../Containers/TodosListItem';

const styles = {
    subheading: {
        backgroundColor: "#3f51b5",
        color: "#fff",
        fontSize: "21px",
        padding: "11px 15px",
        margin: 0
    }
};

class TodosList extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        toggleActiveTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
    };

    getTodosList = () => {
        const { todos, toggleActiveTodo, deleteTodo } = this.props;

        if(todos.length < 1) { return "" }

        return todos.map( listItem => (
            <TodosListItem
                key={listItem.id}
                text={listItem.title}
                isDone={listItem.isDone}
                isRejected={listItem.isRejected}
                toggleTodo={() => toggleActiveTodo(listItem.id)}
                deleteTodo={() => deleteTodo(listItem.id)}
            />
        ));
    };

    render() {
        const { classes, todos } = this.props;

        return (
            <div className="todos-list">
                <List
                    component="nav"
                    subheader={
                        <ListSubheader
                            component="h2"
                            className={classes.subheading}
                        >
                            List of your todos:
                        </ListSubheader>
                    }
                >
                    {(todos.length < 1) && <ListItem>
                        <ListItemText>You don't have todos!</ListItemText>
                    </ListItem>}
                    { this.getTodosList() }
                </List>
            </div>
        );
    }
};

export default withStyles(styles)(TodosList);