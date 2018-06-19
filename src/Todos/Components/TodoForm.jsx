import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import guid from '../utils/getGuid';
import { errorMessage } from "../utils/uiMessages";

const styles = {
    card: {
        width: "500px",
    },
    cardContent: {
        padding: 0,
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3f51b5",
        color: "#fff",
        margin: 0,
        minHeight: "50px",
        fontWeight: "normal"
    },
    inputs: {
        display: "flex",
        padding: "15px 25px",
        flexDirection: "column",
    },
    descInput: {
        marginTop: "10px",
    },
    formBtn: {
        marginBottom: "15px",
    }
};

class TodoForm extends Component {
    static propTypes = {
        addTodo: PropTypes.func.isRequired,
    };

    state = {
        titleFiledValue: '',
        descFieldValue: '',
    };

    createNewTodo = () => {
        this.props.addTodo({
            id: guid(),
            isActive: true,
            title: this.state.titleFiledValue,
            isDone: false,
            isRejected: false,
            desc: this.state.descFieldValue,
        });
    };

    handleTitleField = (e) => {
        this.setState({ titleFiledValue: e.target.value });
    };

    handleDescField = (e) => {
        this.setState({ descFieldValue: e.target.value });
    };

    checkFields = (e) => {
        e.preventDefault();

        const { titleFiledValue, descFieldValue } = this.state;

        if(titleFiledValue.trim() === '' || descFieldValue.trim() === '') {
            errorMessage("You must enter something in field!");
        } else {
            this.createNewTodo();
        }
    };

    render() {
        const { classes } = this.props;
        const { titleFiledValue, descFieldValue } = this.state;

        return (
            <div className="todo">
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <h1 className={classes.header}>Create new todo</h1>
                        <div className={classes.inputs}>
                            <FormControl>
                                <InputLabel htmlFor="todos-title__input">Enter title of yours todo</InputLabel>
                                <Input
                                    value={titleFiledValue}
                                    id="todos-title__input"
                                    onChange={this.handleTitleField}
                                />
                            </FormControl>
                            <TextField
                                label="Enter description of yours todo"
                                value={descFieldValue}
                                onChange={this.handleDescField}
                                className={classes.descInput}
                                rows={5}
                                multiline
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.formBtn}
                            onClick={this.checkFields}
                        >
                            Create
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(TodoForm);