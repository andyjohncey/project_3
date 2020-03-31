import React, { useRef } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_POST, LOADING } from '../../utils/actions';
import API from '../../utils/API';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { lightBlue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 'fullWidth',
    },
    '& > *': {
        margin: theme.spacing(1),
    },
}));

const ColorButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(
            lightBlue[600]),
        backgroundColor:
            lightBlue[600],
        '&:hover': {
            backgroundColor:
                lightBlue[800],
        },
    },
}))(Button);

export default function Post() {
    const titleRef = useRef();
    const bodyRef = useRef();
    const usernameRef = useRef()
    const [state, dispatch] = useStoreContext();


    const handleSubmit = e => {
        e.preventDefault();
        dispatch({ type: LOADING });
        API.savePost({
            title: titleRef.current.value,
            body: bodyRef.current.value,
            username: usernameRef.current.value
        })
            .then(result => {
                dispatch({
                    type: ADD_POST,
                    post: result.data
                });
            })
            .catch(err => console.log(err));

        titleRef.current.value = "";
        bodyRef.current.value = "";
        usernameRef.current.value = "";
        console.log(usernameRef.current.value)
    };


    // function MultilineTextFields() {
    const classes = useStyles();
    const [value, setValue] = React.useState({
        title: "",
        body: "",
        username: "",
    });

    const printValues = e => {
        e.preventDefault();
        console.log(value.title, value.body, value.username);
    };

    const updateField = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        setValue({ ...value, [name]: value });
    };

    // make API Post request to backend
    const handleClick = e => {
        e.preventDefault();
        dispatch({ type: LOADING });
        API.savePost({
            title: titleRef.current.value,
            body: bodyRef.current.value,
            username: usernameRef.current.value,
        })
            .then(result => {
                dispatch({
                    type: ADD_POST,
                    post: result.data
                });
            })
            .catch(err => console.log(err));

        titleRef.current.value = "";
        bodyRef.current.value = "";
        usernameRef.current.value = ""

        console.log('Im being clicked. And data will be saved');
    };

    return (
        <div className={classes.root}>
            <Typography variant="h5">
                Create a post
            </Typography>
            <div onSubmit={handleSubmit}>
                <TextField
                    id="standard-full-width"
                    label="Title"
                    name="title"
                    style={{ margin: 8 }}
                    placeholder="Subject title"
                    // helperText="Full Width!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    ref={titleRef}
                    className={classes.textField}
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Body"
                    style={{ margin: 8 }}
                    placeholder="Enter a question or comment!"
                    fullWidth
                    margin="normal"
                    multiline
                    rowsMax="15"
                    name="post"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    ref={bodyRef}
                    className={classes.textField}
                    // onChange={handleChange}
                    variant="outlined"
                    onChange={handleChange}
                />
                <TextField
                    label="User name"
                    id="outlined-margin-normal"
                    placeholder=""
                    ref={usernameRef}
                    className={classes.textField}
                    // helperText="Some important text"
                    margin="normal"
                    // onChange={handleChange}
                    variant="outlined"
                />
                <ColorButton variant="outlined" color="primary" type="submit" id="saveBtn" onClick={handleClick}>
                    save
                </ColorButton>
            </div>
        </div >
    );
};


