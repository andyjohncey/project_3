import React from "react";
import AuthContext from '../context/auth-context';
// import { Col, Row, Container } from '';
import Post from '../components/Post/Post';
import Nav from '../components/Nav/Nav';
import ChannelsList from '../components/ChannelsList.js';
import Sidebar from '../components/SideBar/SideBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core';
import Typography from '@material-ui/core';
// import Assist from '../pages/Assist';
import SideBar from "../components/SideBar/SideBar";
import Nav from '../components/Nav';
import Post from '../components/Post';
import ChannelsList from '../components/ChannelsList';

export default function App(){

    const {token} = useContext(AuthContext);
  
    const [friends, setFriends] = useState([])
    useEffect(async ()=>{
      const result = await fetch('/api/friends', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      if(result.status !== 200 && result.status !== 201){
        throw new Error('Failed!')
      }
      const resultJSON = await result.json();
      setFriends(resultJSON.friends)
    }, [])




    return (
        <Container maxWidth="xs">
            <Grid item xs={12}>
                <Nav />
                <SideBar />
                {/* <h1>Channel Post </h1> */}
                <Typography variant="h1">
                    Home
                </Typography>
                <Post />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body">
                  <ListItem>
                  {friends.map((friend)=><li>{friend.name}</li>)}
                  </ListItem>
              </Typography>
            </Grid>
        </Container>
    );
};

