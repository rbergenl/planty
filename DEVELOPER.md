Setup Web Project
----

# Prerequisites
- Have a Google account
- Have a Github account and a repository created (default branch set to develop)
- Login to Cloud9 with your Github account and start a workspace attached to the repository
- Create a project in console.firebase.google.com (and enable Firestore in the Database section)
- Have an IDE installed (Atom)
- Have NodeJS installed

# Getting Started
- `npm install`
- `sudo npm install -g firebase-tools`
- `firebase login`
- `npm run config-app && npm run config-firebase`
- `npm start`

# Project Bundling (Webpack)
- `npm init --yes`
- `npm install --save-dev webpack webpack-dev-server webpack-cli`
- add to package.json: `"start": "webpack-dev-server --mode development"` and `"build": "webpack --mode production"`
- create a file `src/index.js`
- create a file `public/index.html` with the line `<div id="root"></div><script type="text/javascript" src="/main.js"></script></body>`
- create the `webpack.config.js` file:
```javascript
module.exports = {
    output: {
        path: require('path').join(__dirname, 'public')
    },
	devServer: {
		host: process.env.IP,
		public: process.env.C9_HOSTNAME,
		contentBase: 'public'
	}
};
```
- Add to `.gitignore` the line `public/main.js`.

# Logging and Configuration for Development
- `npm install --save-dev loglevel`
- add to package.json `"config-app": "node ./src/config/config-app"`
- create a file `src/config/config-app.js` with the code `require('fs').writeFileSync('./src/config/app.json', JSON.stringify({LogLevel: 'debug' }));`
- create a file `src/config/index.js` with the code `import appConfig from './app.json'; export default { logLevel: appConfig.LogLevel };`
- add to `.gitignore` the line `src/config/config-app.json`
- add to `index.js` at the top:
```javascript
// Logging
import * as log from 'loglevel';
import Config from './config';
log.setLevel(Config.logLevel);
log.info('hello world');
```

# App Shell (React)
- `$ npm install --save-dev babel-core babel-loader babel-preset-env`
- add to `webpack.config.js` the module.rules[]: `{ test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']	}`
- `npm install --save react react-dom babel-preset-react`
- add to `.babelrc` the code `{ "presets": ["env", "react"] }`
- - add to `index.js` the followin snippet:
```javascript
// React
import React from 'react';
import { render } from 'react-dom';
// App Shell
render(
  <h1>Hello World</h1>,
  document.getElementById('root'),
);
```

# Router
- `npm install --save react-router-dom history`
- add to `webpack.config.js` to the devServer settings: `historyApiFallback: true`
- add to `src/containers/Root.js`::
```javascript
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
```
- Add to `src/lib/history.js`:
```javascript
// History singleton used by routers
import { createBrowserHistory } from 'history';
export default createBrowserHistory();
```
Add to `src/index.js`:
```javascript
// Router
import { Router } from 'react-router-dom';
import Root from './containers/Root';
import history from './lib/history';
// App Shell
render(
  <Router history={history}>
    <Root />
  </Router>,
  document.getElementById('root'),
);
```

# Firebase Hosting
- Run `$ npm install -g firebase-tools`
- Run `$ firebase login --no-localhost`
- Run `$ firebase init` and select all options (firestore, functions, hosting, database, etc..) and accept all defaults (but dont install dependencies now)
- Run `$ npm --prefix ./functions install` (to now outside the firebase init do the installation of dependencies in the just generated functions folder)
- Add to package.json `"serve-firebase": "npm run build && firebase serve --port $PORT --host $IP"` and run `$ npm run serve-firebase`
- Add to package.json `"deploy-firebase": "npm run build && firebase deploy --only hosting"` and run `$ npm run deploy-firebase`


# Firebase Authentication
- At https://console.firebase.google.com the project, enable Google signin on Authentication section; and add the hosting URL to 'gemachtigde domeinen'
- Run `$ npm install --save firebase`
- Add to package.json `"config-firebase": "firebase setup:web --json > ./src/config/firebase.json"` and do `npm run config-firebase`
- Add to `.gitignore` the line `src/config/firebase.json`
- Add to `src/config/index` the lines `import firebaseConfig from './firebase.json';` and to the export `{firebase: firebaseConfig.result}`
- Add to `src/lib/firebase.js` the code:
```javascript
import firebase from 'firebase/app';
import 'firebase/auth';
import * as log from 'loglevel';
export const firebaseApp = firebase;
export const auth = firebase.auth;

const provider = new auth.GoogleAuthProvider();

export async function loginUser() {
    try {
        const result = await auth().signInWithPopup(provider);
        const userData = Object.assign({
              user: result.user,
              token: result.credential.accessToken
          });
          log.info(userData);
          return userData;
    } catch(error) {
          return error;
    }
}
```
- Add to `src/index.js` to lines `import { firebaseApp } from './lib/firebase'; firebaseApp.initializeApp(Config.firebase);`
- Change in `src/containters/Root.js` the `<h1>login</h1>` into `<button onClick={this.handleLogin}>Login</button>` and add `import { loginUser } from '../lib/firebase';` and `handleLogin() { loginUser(); }`
- Run `$ npm install --save-dev babel-plugin-transform-runtime` and add to `.babelrc` the line `"plugins": ["transform-runtime"]` (it is for e.g. async/await functions)

## Login/Logout Flow (with a sessions alwasy go back to the root; when no session, redirect to /landing)
=> when user goes to / (so wants to load the app), but has no sessions -> go to /landing
=> when on landing, login or register and already has sessions; go to / (the app)
=> when on landing, but has no sessions; be able to do social login, login, or register
=> when logged in > redirect to "comes from or by default to / (app)"
=> when user is logged in; and is in the app, and clicks on logout; go to /


# State Management (Redux)
- Run `npm install --save redux react-redux redux-thunk`
- Add to `src/index.js` and wrap the router with `<Provider store={store}>`:
```javascript
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
const rootReducer = (state, action) => {return {auth: {loggedIn:false}}};
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk),
);
```
Add to `src/containers/Root.js`: (Add withRouter() so that the location gets updated into child-components as well (e.g. login component uses `withRouter(connect());`))
```javascript
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
render() {
  const { loggedIn } = this.props;
  return(<Route path="/" render={() => {return loggedIn === false ? (<Redirect to={{pathname: '/login'}} />) : (<h1>App</h1>)}} />)
}
const mapStateToProps = state => ({ loggedIn: state.auth.loggedIn });
export default withRouter(connect(mapStateToProps)(Root));
```
- Check the result and see the automatic redirect to /login because state.auth.loggedIn is false.

## Actions
- Create the file `src/actions/authActions.js`:
```javascript
import * as Firebase from '../lib/firebase';
import * as log from 'loglevel';
import history from '../lib/history';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from '../actions';
export const loginUser = () => {
    return async (dispatch) => {
        try{
          const userData = await Firebase.loginUser();
          log.info(userData);
          dispatch({ type: LOGIN_USER_SUCCESS });
          history.push('/');
        } catch (e) {
          dispatch({ type: LOGIN_USER_FAILED });
        }
    };
};
```
- Create the file `src/actions/index.js`:
```javascript
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
```
- Create the file `src/reducers/authReducer.js`;
```javascript
import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILED } from '../actions';
export const initialState = { loggedIn: false };
export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return { loggedIn: true };
        default:
            return state;
    }
};
```
- Modify in `src/index.js` the line to `const rootReducer = combineReducers({auth});` and do `import auth from './reducers/authReducer';` and `import { combineReducers } from 'redux'`
- Modify in `src/containers/Root.js` the line to `import { loginUser } from '../actions/authActions';` and `import { bindActionCreators } from 'redux';`
- Add the line `const mapDispatchToProps = dispatch => (bindActionCreators({ loginUser: loginUser }, dispatch));` and add this constant as second parameter to the `connect` function.
- Modify the button line to `onClick={this.props.loginUser}`

# Theme (Material-ui)
- Run `$ npm install --save @material-ui/core`
- Run `$ npm install --save-dev style-loader css-loader`
- Add to `webpack.config.js` the module.rule: `{ test: /\.css$/, exclude: /node_modules/, use: ['style-loader', 'css-loader'] }`
- Create `src/index.css` with the code `body { margin: 0; padding: 0; font-family: 'Roboto', Helvetica, Arial, sans-serif; background: #ECEFF1; }` and add at the top of `index.js` the code `import './index.css';`
- Add `import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';` and `const theme = createMuiTheme();` with wrapping the Router with `<MuiThemeProvider theme={theme}>`
- Add to `index.html` the following snippet: `<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet"><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`
- Replace in `src/containers/Root.js` the `<button>` with `<Button variant="raised" color="primary">` and load at the top `import Button from '@material-ui/core/Button';`

- Run `$ npm install --save-dev babel-plugin-transform-decorators-legacy` and add to `.babelrc` plugins `"transform-decorators-legacy"`
- Add to Root.js:
```javascript
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  root: {
    background: 'white',
    maxWidth: '360px',
    margin: '100px auto 16px',
    padding: '32px 24px',
    borderRadius: '3px'
  }
});
@withStyles(styles)
class Root extends Component {
    render() {
      const { loggedIn, classes } = this.props;
      return (<div className={classes.root}> // rest of code ...
```

## Add Icons / Social Login
- On `https://developers.google.com/identity/sign-in/web/build-button` find the stylesheet to the logo(e.g. `/identity/sign-in/g-normal.png`). Enter this URL to download the file and store it to `src/assets`.
- Run `npm install --save-dev file-loader` and add to `webpack.config.js` the line `{ test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }`
- Add to `src/containers/landing.js` the code `import GoogleIcon from '../assets/g-normal.png';` and `<img src={GoogleIcon} className={classes.leftIcon} />`

## Change the Theme Palette
```javascript
import green from '@material-ui/core/colors/green';
const theme = createMuiTheme({
  palette: {
    primary: {
      ...green, // use the pre-defined color, but explicitly set contrastText because the one in pre-defined green is 'black'
      contrastText: '#fff'
    }
  }
});
```

### Older remarks
- Run `$ npm install mdi-material-ui --save`
- Add `import Google from 'mdi-material-ui/Google';` and `<Google />` inside the button.
- `npm install --save @material-ui/icons`
- `npm install svg-react-loader --save-dev`
- `{ test: /\.svg$/, loader: 'babel!svg-react'}`

# Multilingual support (React-Localize)
- https://ryandrewjohnson.github.io/react-localize-redux-docs/
- Run `$ npm install react-localize-redux --save`
- In `src/index.js` add `import { localizeReducer as locale } from 'react-localize-redux'; and ... combineReducers({ locale });`
- In `src/containers/Root.js` add `import { initialize, withLocalize } from 'react-localize-redux';` and `bindActionCreators({ initialize })`
- In `src/containers/App.js` add `const mapStateToProps = state => ({ translate: getTranslate(state.locale) });` and `<h1>{this.props.translate('title')}</h1>`

# WebApp (manifest.json, icons, serviceworker)

## Offline Support (serviceworker-cache for app-shell, and redux-offline for state persistence)
- Run `$ npm install --save @redux-offline/redux-offline`.
- Add to `src/index.js` the lines `import { offline } from '@redux-offline/redux-offline'; import offlineConfig from '@redux-offline/redux-offline/lib/defaults'; compose( applyMiddleware(ReduxThunk), offline(offlineConfig) )`

# IoT Device and User Onboarding
- Create IAM Prodiver 'openid connect'. Get Client ID from console.cloud.google.com, select your project, go to 'API and Service' > inloggegevens. Use provider url: `https://accounts.google.com`
- Create IAM Role 'identity_pool_auth' with Trust Relationship AssumeRole 'string equals' value of the 'identity pool arn'. Also attach the 'managed policy' of 'AWSIoTDataAccess'. Also add an inline policy with name `invoke-api-gateway`:
```json
{
    "Version": "2012-10-17",
    "Statement": {
        "Effect": "Allow",
        "Action": "execute-api:Invoke",
        "Resource": "arn:aws:execute-api:us-east-1:205612092240::/*"
    }
}
```
- Create Cognito UserPool on AWS.
- Create Cognito IdentityPool with name 'identity_pool'. Attach the auth role to it.
- Create IoT Policies
- Create Lambda Function
- Add all config to `config/index.js`
- Add `aws-cognito` and Run `$ npm install --save amazon-cognito-identity-js`
- Add `sigV4Client.js` and Run `$ npm install --save crypto-js`.

- Run `$ npm install --save aws-iot-device-sdk aws-sdk`
- Add to `webpack.config.js` the line `node: { fs: 'empty', tls: 'empty' }`
- Do `export AWS_SERVICES=cognitoidentity,dynamodb,s3,sqs` (to reduce webpack bundle size)

# Troubleshooting
- `npm install --save-dev babel-preset-stage-2` and add to `.babelrc` (stage-2 for class propTypes)
- `npm install --save-dev babel-preset-stage-3` and add to `.babelrc` (stage-3 for spread operator)


https://stackoverflow.com/questions/40301345/connect-to-aws-iot-using-web-socket-with-cognito-authenticated-users
https://docs.aws.amazon.com/iot/latest/developerguide/thing-policy-examples.html

Add Lambda function
```javascript
function attachPrincipalPolicy(device_id, cognito_user_id) {
    const iotMgmt = new AWS.Iot();
    return new Promise(function(resolve, reject) {
        let params = {
            policyName: device_id + '_policy',
            principal: cognito_user_id
        };
        console.log("Attaching IoT policy to Cognito principal")
        iotMgmt.attachPrincipalPolicy(params, (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
```
