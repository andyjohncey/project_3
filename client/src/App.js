import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import AuthContext from './context/auth-context';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav/Nav';
import Assist from './pages/Assist';
import Home from './pages/Home';

export default function App(){

  const [state, setState] = useState({
    token: null,
    userId: null,
  })


  const login = (token, userId, tokenExpiration) => {
    setState({token: token, userId: userId})
  }
  const logout = (token, userId, tokenExpiration) => {
    setState({token: null, userId: null})
  }

  return (
    <Router>
       <AuthContext.Provider value={{
        token: state.token,
        userId: state.userId,
        login: login, 
        logout: logout,
      }}>
      <Nav />
        <div className={classes.root}>
          <Switch>
            {state.token && <Route path="/" component={Home} />}
            {state.token && <Route path="/posts" component={Home} />}
            {state.token && <Route path="/post/:id" component={Detail} />}
            {!state.token && <Route path="/auth" component={AuthPage}/>}
            {!state.token && <Redirect from="/" to="/auth" exact/>}
            {!state.token && <Redirect to="/auth" exact/>}
            {!state.token && <Route component={NoMatch} />}
          </Switch>
        </div>
      </AuthContext.Provider>
    </Router>
  );


}