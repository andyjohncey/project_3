import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/Divider';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Nav from './components/Nav/Nav';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexshrink: 0,
        },
    },
}));

function ResponsiveDrawer(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const Drawer = (
        <div>
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
                {[{ text: 'Channels', icon: <PostAddIcon /> }, { text: 'Direct Message', icon: <AddCommentIcon /> }].map((data, index) => (
                    <ListItem button key={data.text}>
                        <ListItemIcon>{data.icon}</ListItemIcon>
                        <ListItemText primary={data.text} />
                    </ListItem>
                ))}
            </List> />
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Nav />
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    container: propTypes.any,
};

export default ResponsiveDrawer;

