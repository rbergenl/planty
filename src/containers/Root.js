import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

export default class Root extends Component {
    render() {
        return (
            <Switch>
              <Route
                path="/login"
                render={() => {return <h1>Login</h1>}}
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
