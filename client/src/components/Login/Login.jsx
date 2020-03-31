import React, { Component } from 'react';
import clsx from 'clsx';
import { Redirect } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Typography } from '@material-ui/core';
import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        // this.googleSignin = this.googleSignin.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')
        this.props._login(this.state.username, this.state.password)
        this.setState({
            RedirectTo: '/'
        })
    }

    InputAdornments() {
        const classes = useStyles();
        const [values, setValues] = React.useState({
            username: '',
            password: '',
            showPassword: false,
        });
    };

    // InputWithIcon() {
    //     const classes = useStyles();

    //     const handleChange = prop => event => {
    //         setValues({ ...values, [prop]: event.target.value });
    //     };

    //     const handleClickShowPassword = () => {
    //         setValues({ ...values, showPassword: !values.showPassword });
    //     };

    //     const handleMouseDownPassword = event => {
    //         event.preventDefault();
    //     };
    // }

    render() {
        const { classes } = this.props
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <FormControl className={clsx(classes.margin, classes.textField), "LoginForm"}>
                    <Typography variant='h5'>Login form </Typography>
                    <InputLabel htmlFor="username">Username:</InputLabel>
                    <Input
                        id="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                    />
                    <InputLabel htmlFor="standard-adornment-password">Password:</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        name="password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Button variant="contained" onClick={this.handleSubmit} color="primary" >
                        Login
                                </Button>
                    <a href="/auth/google">
                        <img src={googleButton} alt="sign into Google Button" />
                    </a>
                </ FormControl>
            )
        };
    };
}


export default Login