import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/PlaylistAdd';

const styles = {
    button: {
        position: "fixed",
        top: "25px",
        right: "25px",
    }
};

const AddTodoButton = ({classes, toggleForm}) => {
    return (
        <Button className={classes.button} variant="fab" color="primary" onClick={toggleForm}>
            <AddIcon />
        </Button>
    );
};

AddTodoButton.propTypes = {
    toggleForm: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddTodoButton);