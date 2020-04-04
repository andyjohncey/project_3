import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
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
import Container from '@material-ui/core/Container';
import Nav from '../components/Nav/Nav';
import Post from '../components/Post/Post';
import { useStoreContext } from '../utils/GlobalState';
import API from '../utils/API';
// import SideBar from '../components/SideBar/SideBar';
import Channels from '../components/Channels/Channels';
import ChannelsList from '../components/ChannelsList/ChannelsList';
import { SET_SIDEBAR_OPEN } from '../utils/actions';
// import { Typography } from '@material-ui/core';
// import Main from '../components/Main/Main';

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


function Assist() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    // set the sidebar/ drawer open/ close feature
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    // Setting our component's initial state
    const [posts, setPosts] = useState([])
    const [formObject, setFormObject] = useState({})


    // Load all posts and store them with setPosts
    useEffect(() => {
        loadPosts()
    }, [])

    // Loads all posts and sets them to posts
    function loadPosts() {
        API.getPosts()
            .then(res =>
                setPosts(res.data)
            )
            .catch(err => console.log(err));
    };

    // // Deletes a post from the database with a given id, then reloads posts from the db
    // function deletePost(id) {
    //     API.deletePost(id)
    //         .then(res => loadPosts())
    //         .catch(err => console.log(err));
    // }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.title && formObject.username && formObject.body) {
            API.savePost({
                title: formObject.title,
                username: formObject.username,
                body: formObject.body
            })
                .then(res => loadPosts())
                .catch(err => console.log(err));
        }
    };

    const [state, dispatch] = useStoreContext();

    const handleIconClicked = () => {
        dispatch({
            type: SET_SIDEBAR_OPEN,
            isSidebarOpen: false,
        })
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.root}>
            <Grid item xs={12}>
                {/* <Nav />
                <SideBar /> */}
                {/* <h1>Channel Post </h1> */}
                {/* <Post /> */}
            </Grid>
            <Grid item xs={12}>
                <ChannelsList />
            </Grid>
                
            <CssBaseline />
            <Nav handleOpen={handleDrawerOpen} handleClose={handleDrawerClose} />
            {/* <Drawer open = {open} handle = {handleDrawerClose}*/}
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
                <List>
                    {[{ text: 'Profile', icon: <AccountCircleIcon /> }].map((data, index) => (
                        <ListItem button key={data.text}>
                            <ListItemIcon>{data.icon}</ListItemIcon>
                            <ListItemText primary={data.text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {[{ text: 'Channels', icon: <PostAddIcon /> }, { text: 'Direct Message', icon: <AddCommentIcon /> }, { text: 'Calendar', icon: <EventIcon /> }].map((data, index) => (
                        <ListItem button key={data.text}>
                            <ListItemIcon>{data.icon}</ListItemIcon>
                            <ListItemText primary={data.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <Post/>
                    <Channels />
                    <ChannelsList />
                    {/* <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                        facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                        gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                        donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                        Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                        imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                        arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                        donec massa sapien faucibus et molestie ac.
                    </Typography>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                        consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                        hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                        tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                        nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                        accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                    </Typography> */}
                </main>
            </div>
        </div>
        </Container>
    );
}

export default Assist;

