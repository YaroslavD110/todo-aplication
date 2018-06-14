import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import WarningIcon from '@material-ui/icons/Warning';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

const TodosListItem = ({isDone, isRejected, text, toggleTodo, deleteTodo}) => (
    <ListItem button onClick={toggleTodo}>
        <ListItemIcon>
            {
                isRejected
                ? <ErrorIcon style={{color: "#D50000"}} />
                : ( isDone ? <DoneIcon style={{color: "#76FF03"}} /> : <WarningIcon style={{color: "#FFEA00"}} /> )
            }
        </ListItemIcon>
        <ListItemText inset primary={text} />
        <ListItemSecondaryAction>
            <IconButton aria-label="Delete todo item" onClick={deleteTodo}>
                <DeleteForever style={{color: "#D50000"}} />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
);

TodosListItem.propTypes = {
    isDone: PropTypes.bool.isRequired,
    isRejected: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
};

export default TodosListItem;