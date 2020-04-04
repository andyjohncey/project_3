import React, { useState, useRef, useContext } from "react";
import AuthContext from "../context/auth-context";
import { Input, Container } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { lightBlue } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Nav from '../components/Nav/Nav';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    input: {
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
    color: theme.palette.getContrastText(lightBlue[600]),
    backgroundColor: lightBlue[600],
    "&:hover": {
      backgroundColor: lightBlue[800]
    }
  }
}))(Button);

function AuthPage() {
  const emailEl = useRef();
  const passwordEL = useRef();

  const [formObject, setFormObject] = useState({
      email:"",
      password:""
  })
  const [state, setState] = useState({
    isLogin: true
  });

  const { login } = useContext(AuthContext);

  const handleInputChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;

      console.log(name, value)

      setFormObject({...formObject, [name]:value})
  } 
  const submitHandler = async event => {
    event.preventDefault();

    const email = formObject.email;
    const password = formObject.password;

    console.log(email);
    console.log(password);
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    const data = {
      email,
      password
    };
    const url = state.isLogin ? "/api/auth/login" : "/api/auth/signup";
    try {
      const result = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
        
      });
      console.log(result)

      if (result.status !== 200 && result.status !== 201) {
        throw new Error("Failed!");
      }
      const resultJSON = await result.json();
      console.log(resultJSON);
      if (resultJSON.errors) {
        console.log(resultJSON.errors[0].message);
      } else {
        if (resultJSON.token) {
          console.log(resultJSON.userId);
          console.log(resultJSON.token);
          console.log(resultJSON.tokenExpiration);
          console.log(resultJSON);
          login(
            resultJSON.token,
            resultJSON.userId,
            resultJSON.tokenExpiration
          );
        }
      }
    } catch (errors) {
      console.log(errors);
    }
  };
  const switchModHandler = () => {
    setState({ isLogin: !state.isLogin });
  };
const classes = useStyles();
  return (
    <>
      <Container className={classes.root}>
        <Typography variant="h4"> {state.isLogin ? "Login" : "Signup"}</Typography>
        <Input
          id="email"
          label="Email"
          name="email"
          type="email"
          value={formObject.email}
          style={{ margin: 8 }}
          placeholder="Email address"
          // helperText="Full Width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          // ref={emailEl}
          className={classes.input}
          variant="outlined"
          onChange={handleInputChange}
        />
        <Input
          id="password"
          label="Password"
          name="password"
          style={{ margin: 8 }}
          placeholder="Enter your password here"
          // helperText="Full Width!"
          fullWidth
          margin="normal"
          value={formObject.password}
          InputLabelProps={{
            shrink: true
          }}
          // ref={passwordEL}
          className={classes.input}
          variant="outlined"
          onChange={handleInputChange}
        />
        <ColorButton variant="outlined" color="primary" onClick={submitHandler}>
          Submit
        </ColorButton>
        <ColorButton
          variant="outlined"
          color="primary"
          type="button"
          id="saveBtn"
          onClick={switchModHandler}
        >
          {state.isLogin ? "Signup" : "Login"}
        </ColorButton>
      </Container>
    </>
  );
}
  //{
    /* <h1 style={{"margin": "auto"}}>{state.isLogin ?  'Login' : 'Signup'}</h1> */
//   }
//   {
    /* <form className="auth-form" onSubmit={submitHandler}>
    <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailEl}></input>
    </div>
    <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordEL}></input>
    </div>
    <div className="form-actions">
        <button type="submit" >Submit</button>
        <button type="button" onClick={switchModHandler}>Switch to {state.isLogin ? 'Signup': 'Login'}</button>
    </div>
</form>  
</div> */

    /* </> */
  
  // )
export default AuthPage;
