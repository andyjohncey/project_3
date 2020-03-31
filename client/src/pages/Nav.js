import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        maginRight: theme.spacing(2),
    }
}));

const Nav = (props) => {
    const classes = useStyles();
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar)}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={props.handleOpen}
                    edge="start"
                    className={clsx(classes.menuButton)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title} noWrap>
                    Aged Care Worker Assist
            </Typography>
                <div style={{ marginLeft: "auto" }}>
                    <Button color="inherit">
                        login
                </Button>
                </div>
            </Toolbar>
        </AppBar>

    );
}

export default Nav;