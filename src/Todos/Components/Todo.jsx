import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';

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
    desc: {
        padding: "15px 25px",
    }
};

class Todo extends Component {
    static propTypes = {
        activeTodo: PropTypes.object.isRequired,
        toggleTodoRejecting: PropTypes.func.isRequired,
        toggleTodoDoneStatus: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
    };

    render() {
        const { classes, activeTodo, toggleTodoRejecting, toggleTodoDoneStatus, deleteTodo } = this.props;

        return (
            <div className="todo">
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <h1 className={classes.header}>{activeTodo.title}</h1>
                        <Typography component="p" className={classes.desc}>{activeTodo.desc}</Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={() => toggleTodoDoneStatus(activeTodo.id)}>
                            <DoneIcon style={ activeTodo.isDone ? {color: "#76FF03"} : {color: "#D50000"} } />
                        </IconButton>
                        <IconButton onClick={() => deleteTodo(activeTodo.id)}>
                            <DeleteIcon style={{color: "#D50000"}} />
                        </IconButton>
                        <IconButton onClick={() => toggleTodoRejecting(activeTodo.id)}>
                            <PowerIcon style={ activeTodo.isRejected ? {color: "#D50000"} : {color: "#76FF03"} } />
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        );
    }
};

export default withStyles(styles)(Todo);