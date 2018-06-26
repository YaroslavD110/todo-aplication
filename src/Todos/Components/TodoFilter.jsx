import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    }
});

class TodoFilter extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        filterTodos: PropTypes.func.isRequired
    };

    state = { activeTab: 0 };

    getAll = () => {
        this.props.filterTodos(null);
        this.setState({activeTab: 0});
    };

    filterByDone = () => {
        this.props.filterTodos(
            this.props.todos.filter(todo => (todo.isDone === true) && (todo.isRejected !== true))
        );
        this.setState({activeTab: 1});
    };

    filterByProgress = () => {
        this.props.filterTodos(
            this.props.todos.filter(todo => (todo.isDone !== true) && (todo.isRejected !== true))
        );
        this.setState({activeTab: 2});
    };

    filterByRejected = () => {
        this.props.filterTodos(
            this.props.todos.filter(todo => todo.isRejected === true)
        );
        this.setState({activeTab: 3});
    };

    componentDidMount() {
        const { todos } = this.props;

        let all = todos.length;
        let done = todos.filter(todo => (todo.isDone === true) && (todo.isRejected !== true)).length;
        let inProgress = todos.filter(todo => (todo.isDone !== true) && (todo.isRejected !== true)).length;
        let rejected = todos.filter(todo => todo.isRejected === true).length;

        this.setState({ count: { all, done, inProgress, rejected } })
    }

    render() {
        const { classes } = this.props;
        const { activeTab } = this.state;

        return (
            <div className="todos-filter">
                <AppBar position="static" className={classes.margin}>
                    <Tabs value={activeTab}>
                        <Tab
                            onClick={this.getAll}
                            label="All" />
                        <Tab
                            onClick={this.filterByDone}
                            label="Done" />
                        <Tab
                            onClick={this.filterByProgress}
                            label="In progress" />
                        <Tab
                            onClick={this.filterByRejected}
                            label="Rejected" />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(TodoFilter);