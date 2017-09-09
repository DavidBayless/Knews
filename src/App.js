import React, { Component } from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home.js';
import Login from './components/login.js';
import NoMatch from './components/nomatch.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default App;
