import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ReactDOM from 'react-dom';
import Rob from './components/rob';
import Laura from './components/laura';
import Home from './components/home';

const App = () => {
  return(
    <div>
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/laura" component={Laura} />
            <Route exact path="/rob" component={Rob} />
          </Switch>
      </BrowserRouter>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));
