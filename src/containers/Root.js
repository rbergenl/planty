import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';

import App from './App';
import Landing from './Landing';

const styles = theme => ({
  root: {
 //   backgroundColor: 'blue',
//    maxWidth: '500px',
//    minHeight: '100vh',
//    margin: 'auto'
  }
});

@withStyles(styles)
class Root extends Component {
    render() {
        const { loggedIn, classes } = this.props;
      
        return (
            <div className={classes.root} id="message">
              <Switch>
                <Route
                  path="/landing"
                  exact
                  render={() => {return <Landing />}}
                />
                <Route
                  path="/login"
                  render={() => {return <h1>Login here</h1>}}
                />
                <Route
                  path="/signup"
                  exact
                  render={() => {return <h1>Sing up here</h1>}}
                />
                <Route path="/" render={() => {return loggedIn === false ? (<Redirect to={{pathname: '/landing'}} />) : (<App />)}} />
              </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({ loggedIn: state.auth.loggedIn });
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));
export default withRouter(connect(mapStateToProps, mapDispatchToProps)( Root ));
