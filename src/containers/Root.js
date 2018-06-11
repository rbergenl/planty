import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//import { loginUser } from '../lib/firebase';
import { loginUser } from '../actions/authActions';

class Root extends Component {
    render() {
        const { loggedIn } = this.props;
      
        return (
            <Switch>
              <Route
                path="/login"
                render={() => {return <button onClick={this.props.loginUser}>Login</button>}}
              />
              <Route
                path="/register"
                exact
                render={() => {return <h1>Register</h1>}}
              />
              <Route path="/" render={() => {return loggedIn === false ? (<Redirect to={{pathname: '/login'}} />) : (<h1>App</h1>)}} />
            </Switch>
        );
    }
}

const mapStateToProps = state => ({ loggedIn: state.auth.loggedIn });
const mapDispatchToProps = dispatch => (bindActionCreators({ loginUser: loginUser }, dispatch));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)( Root ));