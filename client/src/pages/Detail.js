import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import API from '../utils/API';
import { useStoreContext } from '../utils/GlobalState';
// import { SET_CURRENT_POST } from '../utils/actions';
import { Typography } from '@material-ui/core/Typography/Typography';
import { SET_CURRENT_POST } from '../utils/actions';

function Detail(props) {
    // const [posts, setPosts] = useState({})
    const [state, dispatch] = useStoreContext();

    // When this component mounts, grab the post with the _id of props.match.params.id
    // e.g. localhost:3000/books/599dcb67f0f16317844583fc

    // useEffect(() => {
    //     API.getPosts(props.match.params.id)
    //         .then(res => setPosts(res.data))
    //         .catch(err => console.log(err));
    // }, [])

    useEffect(() => {
        API.getPost(props.match.params.id)
            .then(res => dispatch({ type: SET_CURRENT_POST, post: res.data }))
            .catch(err => console.log(err));
    }, []);

    // export class Detail extends Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = {
    //             nextPostId: 0,
    //             newPostLabel: ""
    //         };
    //     }

    //     componentDidMount() {
    //         axios
    //             .get(
    //                 // "https://gist.githubusercontent.com/witalewski/fc8f043d53a0d505f84c5ddb04ae76ea/raw/7c505bbc1675a0bc8a067f8b633b531c769bb64c/data.json"
    //             )
    //             .then(({ data }) => {
    //                 this.setState({ post: data });
    //                 this.setState({ nextPostId: data.length });
    //             });
    //     }
    //     //   change the markTodoAsDone
    //     markTodoAsDone = (id, done) =>
    //         this.setState({
    //             posts: this.state.posts.map(post =>
    //                 post.id === id ? { ...post, done } : post
    //             )
    //         });

    //     removePost = id =>
    //         this.setState({
    //             post: this.state.posts.filter(post => post.id !== id)
    //         });

    //     addNewPost = () =>
    //         this.setState({
    //             post: [
    //                 ...this.state.post,
    //                 {
    //                     id: this.state.nextPostId,
    //                     title: this.state.newPostTitle,
    //                     body: this.state.newPostBody,
    //                     username: this.state.newPostUsername,
    //                     date: date.Now()
    //                 }
    //             ],
    //             nextPostId: this.state.nextPostId + 1,
    //             newPostTitle: "",
    //             newBody: this.state.newPostBody,
    //             newUsername: this.state.newPostUsername,
    //             newDate: date.Now()

    //         });





    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));


    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4">
                            {state.currentPost.title} by {state.currentPost.username}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4">
                            Content:
                                </Typography>
                        <Typography variant="paragraph">
                            {state.currentPost.body}
                        </Typography>
                    </Paper>
                })
                        </Grid>
                <Grid item sm={2}>
                    <Paper className={classes.paper}>
                        <Link to="/">← Back to Posts</Link>
                    </Paper>
                </Grid>
            </Grid>
            ) : (
            <div>loading...</div>
                )
            }</div >
    )
};

export default Detail;