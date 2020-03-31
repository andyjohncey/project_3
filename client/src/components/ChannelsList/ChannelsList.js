import React, { useEffect } from 'react';
// import { ListItem,  } from '../List';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_POST, UPDATE_POST, LOADING } from '../../utils/actions';
import API from '../../utils/API';


function ChannelsList() {
    const [state, dispatch] = useStoreContext();

    const removePost = id => {
        API.deletePost(id)
            .then(() => {
                dispatch({
                    type: REMOVE_POST,
                    _id: id
                });
            })
            .catch(err => console.log(err));
    };

    const getPosts = () => {
        dispatch({ type: LOADING });
        API.getPosts()
            .then(results => {
                dispatch({
                    type: UPDATE_POST,
                    posts: results.data
                });
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getPosts();
    }, []);

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
        },
    }));

    // const handleClick = event => {
    //     // make API Post request to backend
    const handleClick = e => {
        e.preventDefault();
        dispatch({ type: LOADING })

        API.removePost = id => {
            API.deletePost(id)
                .then(() => {
                    dispatch({
                        type: REMOVE_POST,
                        _id: id
                    });
                })
                .catch(err => console.log(err));
            console.log('Im being clicked. And data will be saved');
        };
    };

    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Typography variant="h5" gutterBottom>
                            All Channel Posts
                        </Typography>
                    </Grid>
                    <Typography variant="h6" gutterBottom>
                        Click on a channel post to view
                   </Typography>
                    {state.posts.length ? (
                        <Grid item xs>
                            {state.posts.map(post => (
                                <Grid Item key={post._id}>
                                    <Link to={"/posts" + post._id}>
                                        <Typography variant="body1" gutterBottom>
                                            {post._id}{post.title}{post.body}{post.username}
                                        </Typography>
                                    </Link>
                                    <Button variant="contained" color="primary" onClick={() => removePost(post._id)}>remove</Button>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                            <Typography variant="h6" gutterBottom>
                                You haven't added any posts yets!
                            </Typography>
                        )}
                </Grid>
            </Paper>
        </div >
    );
}

export default ChannelsList