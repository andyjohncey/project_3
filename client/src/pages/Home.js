import React from "react";
// import { Col, Row, Container } from '';
import Post from '../components/Post/Post';
import Nav from '../components/Nav/Nav';
import ChannelsList from '../components/ChannelsList.js';
import Sidebar from '../components/SideBar/SideBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import Assist from '../pages/Assist';
import SideBar from "../components/SideBar/SideBar";
import Nav from '../components/Nav';
import Post from '../components/Post';
import ChannelsList from '../components/ChannelsList';



function Home() {


    return (
        <Container maxWidth="xs">
            <Grid item xs={12}>
                <Nav />
                <SideBar />
                {/* <h1>Channel Post </h1> */}
                <Post />
            </Grid>
            <Grid item xs={12}>
                <ChannelsList />
            </Grid>
        </Container>
    );
};

export default Home; 