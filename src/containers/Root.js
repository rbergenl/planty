import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { loginUser } from '../lib/firebase';

export default class Root extends Component {
    
    handleLogin() { loginUser(); }
    
    render() {
        return (
            <Switch>
              <Route
                path="/login"
                render={() => {return <button onClick={this.handleLogin}>Login</button>}}
              />
              <Route
                path="/register"
                exact
                render={() => {return <h1>Register</h1>}}
              />
              <Route
                path="/"
                render={() => {return <h1>App</h1>}}
              />
            </Switch>
        );
    }
}
