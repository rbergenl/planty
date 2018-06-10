// Logging
import * as log from 'loglevel';
import Config from './config';
log.setLevel(Config.logLevel);

// React
import React from 'react';
import { render } from 'react-dom';

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