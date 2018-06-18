// Logging
import * as log from 'loglevel';
import Config from './config';
log.setLevel(Config.logLevel);

// Router
import { Router } from 'react-router-dom';
import Root from './containers/Root';
import history from './lib/history';

// Firebase
import { firebaseApp } from './lib/firebase';
firebaseApp.initializeApp(Config.firebase);

// State
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
// - multilingual
import { localizeReducer as locale } from 'react-localize-redux';
// - offline
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
// - reducers
import auth from './reducers/authReducer';
const rootReducer = combineReducers({
  auth,
  locale
});
// - store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(
    applyMiddleware(ReduxThunk),
    offline(offlineConfig)
  )
);

// Theme
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      ...green,
      contrastText: '#fff'
    }
  }
});

// App Shell
import React from 'react';
import { render } from 'react-dom';

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Root />
      </Router>
    </MuiThemeProvider>
  </Provider>, 
  document.getElementById('root')
);
