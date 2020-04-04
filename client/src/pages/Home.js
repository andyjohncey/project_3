import React, { useContext } from "react";
import AuthContext from '../context/auth-context';
// import { Col, Row, Container } from '';
// import Post from '../components/Post/Post';
import Nav from '../components/Nav/Nav';
import Sidebar from '../components/SideBar/SideBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import ListItem from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import Assist from '../pages/Assist';
// import SimpleComponent from './SimpleComponent' 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

function Home(){

    const {token} = useContext(AuthContext);
    console.log(token);
    console.log("Home page oken presenetd above")

    const classes = useStyles();

    return (
        <div className={classes.root}>
        <Container maxWidth="xs">
            <Grid item xs={12}>
            <Typography variant="h1">
                    Home
                </Typography>
                {/* <SimpleComponent /> */}
                <Nav />
                {/* <SideBar /> */}
                <Typography variant="h3">
                Channel Post 
                </Typography>
                 {/* <Post /> */}
            </Grid>
            <Grid item xs={12}>
              <Typography>
                  Login Worked
                  {/* {friends.map((friend)=><li>{friend.name}</li>)} */}
                  
              </Typography>
            </Grid>
        </Container>
        </div>
    );
};

export default Home;
