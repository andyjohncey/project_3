import React from 'react';
import { NavLink} from 'react-router-dom';
import AuthContext from '../context/auth-context';
// import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import { useStoreContext } from '../../utils/GlobalState';
import { SET_SIDEBAR_OPEN } from '../../utils/actions';
import { Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { indigo, lightBlue } from '@material-ui/core/colors';
// import Login from '../Login/Login';

// drawerWidth = 240;

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
        marginRight: theme.spacing(2),
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: lightBlue,
    },
});

const Nav = (props) => {
    // const [state, dispatch] = useStoreContext();
    const {token, logout} = useContext(AuthContext);

    const handleIconClicked = () => {
        dispatch({
            type: SET_SIDEBAR_OPEN,
            isSidebarOpen: true,
        });
    }


    const classes = useStyles();
    const theme = useTheme();
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar)}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={handleIconClicked}
                    edge="start"
                    className={clsx(classes.menuButton)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title} noWrap>
                    Aged Care Worker Assist
                </Typography>
                <div style={{ marginLeft: "auto" }}>
                {!token && <li><NavLink to="/auth">Authentication</NavLink></li>}
                {token && (
                    <li><NavLink to="/logout" onClick={logout}>Logout</NavLink></li>
                )}
                    <Button color="inherit">
                    {!token && <NavLink to="/auth">Authentication</NavLink>}
                    </Button>
                    <br></br>
                    <Button color="inherit">
                    {token && ( <NavLink to="/logout" onClick={logout}>Logout</NavLink>)}
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Nav;

// import React, {useContext} from 'react';
// import { NavLink } from 'react-router-dom';
// import AuthContext from '../context/auth-context';
// import './MainNavigation.css'

// export default (props) => {

//     const {token, logout} = useContext(AuthContext);
    
//     return (
//         <header className="main-nav">
//         <div className="main-nav-logo">
//             <h1>The Navbar</h1>
//         </div>
//         <nav className="main-nav-items">
//             <ul>
//                 {!token && <li><NavLink to="/auth">Authentication</NavLink></li>}
//                 {token && (
//                     <li><NavLink to="/logout" onClick={logout}>Logout</NavLink></li>
//                 )}
//             </ul>
//         </nav>
//         </header>
//     )
    

// }