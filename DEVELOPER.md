# Setup Web Project

## Prerequisites
- Have a Google account
- Have a Github account and a repository created (default branch set to develop)
- Login to Cloud9 with your Github account and start a workspace attached to the repository
- Create a project in console.firebase.google.com (and enable Firestore in the Database section)

## Webpack
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

## Logging and Configuration
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

## React
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

## Router
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

## Firebase Hosting
- Run `$ npm install -g firebase-tools`
- Run `$ firebase login --no-localhost`
- Run `$ firebase init` and select all options (firestore, functions, hosting, database, etc..) and accept all defaults (but dont install dependencies now)
- Run `$ npm --prefix ./functions install` (to now outside the firebase init do the installation of dependencies in the just generated functions folder)
- Add to package.json `"serve-firebase": "npm run build && firebase serve --port $PORT --host $IP"` and run `$ npm run serve-firebase`
- Add to package.json `"deploy-firebase": "npm run build && firebase deploy --only hosting"` and run `$ npm run deploy-firebase`


## Firebase Authentication
- At https://console.firebase.google.com the project, enable Google signin on Authentication section; and add the hosting URL to 'gemachtigde domeinen'
- Run `$ npm install --save firebase`
- Add to package.json `"config-firebase": "firebase setup:web --json > ./src/config/firebase.json"` and do `npm run config-firebase`
- Add to `.gitignore` the line `src/config/firebase.json`


## Redux
- `npm install --save redux react-redux redux-thunk`
- create the file `configureStore.js`.
- create the file `reducers/index.js`.
- create the file `actions/index.js`.
- add to `index.js` the following snippet: `import configureStore from './configureStore'; import { Provider } from 'react-redux'; const store = configureStore;` and wrap the router with `<Provider store={store}>`
- create `actions/authActions.js`
- create `reducers/authReducer.js`

- `npm install --save-dev babel-preset-stage-2` and add to `.babelrc` (stage-2 for class propTypes)
- `npm install --save-dev babel-preset-stage-3` and add to `.babelrc` (stage-3 for spread operator)

### Container (logic)
- add withRouter() so that the location gets updated into child-components as well
- Login component uses `withRouter(connect());`
 

### Component (presentation)
-

## Material-ui
- Run `$ npm install @material-ui/core`
- Run `$ npm install --save-dev style-loader css-loader`
- Add to `webpack.config.js` the module.rule: `{ test: /\.css$/, exclude: /node_modules/, use: ['style-loader', 'css-loader'] }`
- Create `src/index.css` with the code `body { margin: 0; padding: 0; font-family: 'Roboto', sans-serif; }` and add at the top of `index.web.js` the code `import './index.css';`
- Add to `index.html` the following snippet: `<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet"><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`
- Replace in `index.web.js` the `<h1>` with `<Button variant="raised" color="primary">` and load at the top `import Button from '@material-ui/core/Button';`
- Add `import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';` and `const theme = createMuiTheme();` with wrapping the button with `<MuiThemeProvider theme={theme}>`

## Add Icons
- Run `$ npm install mdi-material-ui --save`
- Add `import Google from 'mdi-material-ui/Google';` and `<Google />`.


## WebApp (manifest.json, icons, serviceworker)
