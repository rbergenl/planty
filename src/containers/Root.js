import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initialize, withLocalize } from 'react-localize-redux';

import translations from "../config/translations.json";

import { withStyles } from '@material-ui/core/styles';

//import { loggedInStatusChanged } from '../actions/authActions';

import App from './App';
import Landing from './Landing';
import Login from './Login';

const styles = theme => ({
  root: {
    //background: 'linear-gradient(45deg, green 30%, darkgreen 90%)',
    background: 'white',
    maxWidth: '500px',
    margin: '50px auto 16px',
    padding: '32px 24px',
    borderRadius: '3px'
  }
});

@withStyles(styles)
class Root extends Component {
    constructor(props) {
      super(props);
      this.props.initialize({
        languages: [
          { name: 'English', code: 'en' },
          { name: 'French', code: 'fr' }
        ],
        translation: translations,
        options: {
          renderToStaticMarkup: false,
          defaultLanguage: 'en'
        }
      });
    }
    
    render() {
        const { loggedIn, classes } = this.props;

        return (
            <div className={classes.root}>
              <Switch>
                <Route
                  path="/landing"
                  exact
                  render={() => {return loggedIn === true ? (<Redirect to={{pathname: '/'}} />) : (<Landing />)}}
                />
                <Route
                  path="/login"
                  render={() => {return <Login />}}
                />
                <Route
                  path="/register"
                  exact
                  render={() => {return <h1>Register here</h1>}}
                />
                <Route path="/" render={() => {return loggedIn === false ? (<Redirect to={{pathname: '/landing'}} />) : (<App />)}} />
              </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});
const mapDispatchToProps = dispatch => (bindActionCreators({ initialize }, dispatch));
export default withLocalize(withRouter(connect(mapStateToProps, mapDispatchToProps)( Root )));
