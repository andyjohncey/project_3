import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import { StoreProvider } from './utils/GlobalState';
import Nav from './components/Nav/Nav';
import Assist from './pages/Assist';


function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <Nav />
          <Switch>
            <Route path="/" component={Assist} />
            <Route path="/posts" component={Assist} />
            <Route path="/post/:id" component={Detail} />
            <Route component={NoMatch} />
          </Switch>
        </StoreProvider>
      </div >
    </Router>
  );
}

export default App;
