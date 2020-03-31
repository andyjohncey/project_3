import React from 'react';
// import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';

import List from '@material-ui/core/List';
import ListItemLink from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddCommentIcon from '@material-ui/icons/AddComment';
import EventIcon from '@material-ui/icons/Event';
// import Nav from '../Nav/Nav';
import { useStoreContext } from '../../utils/GlobalState';
import { SET_SIDEBAR_OPEN } from '../../utils/actions';
import { SET_PROFILE_OPEN } from '../../utils/actions'


const drawerWidth = 240;

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
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

function SideBar() {
    const classes = useStyles();
    const theme = useTheme();

    const [state, dispatch] = useStoreContext();


    const handleIconClicked = () => {
        dispatch({
            type: SET_SIDEBAR_OPEN,
            isSidebarOpen: false,
        })
    }

    const profileIconClicked = () => {
        dispatch({
            type: SET_PROFILE_OPEN,
            isProfileOpen: false,
        })
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            {/* <Nav /> */}
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={state.isSidebarOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleIconClicked}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List onClick={profileIconClicked} open={state.isProfileOpen}>
                    <ListItemLink href="./Profile/Profile.js">
                        {[{ text: 'Profile', icon: <AccountCircleIcon /> }].map((data, index) => (
                            <ListItem button key={data.text}>
                                <ListItemIcon>{data.icon}</ListItemIcon>
                                <ListItemText primary={data.text} />
                            </ListItem>
                        ))}
                    </ListItemLink>
                </List>
                <Divider />
                <List>
                    {[{ text: 'Channels', icon: <PostAddIcon /> },
                    { text: 'Direct Message', icon: <AddCommentIcon /> },
                    { text: 'Calendar', icon: <EventIcon /> }].map((data, index) => (
                        <ListItem button key={data.text}>
                            <ListItemIcon>{data.icon}</ListItemIcon>
                            <ListItemText primary={data.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div >
    );
}


export default SideBar;
