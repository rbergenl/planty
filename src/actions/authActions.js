import * as Firebase from '../lib/firebase';
import * as log from 'loglevel';
import history from '../lib/history';

import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  LOGGED_IN_STATUS_CHANGED
} from '../actions';

export const loginUser = () => {
    return async (dispatch) => {
        try {
          // get the user
          const user = await Firebase.loginUser();
          log.info(user);
          dispatch({ type: LOGIN_USER_SUCCESS, user });
          // store the authentication status
          sessionStorage.setItem('isLoggedIn', 'true');
          //verifyIfLoggedIn();
          dispatch({ type: LOGGED_IN_STATUS_CHANGED, loggedIn: true});
          // redirect to the root
          history.push('/');
        } catch (e) {
          dispatch({ type: LOGIN_USER_FAILED });
        }
    };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const result = await Firebase.logoutUser();
      log.info(result);
      dispatch({ type: LOGOUT_USER_SUCCESS });
       // store the authentication status
      sessionStorage.setItem('isLoggedIn', 'false');
      //verifyIfLoggedIn();
      dispatch({ type: LOGGED_IN_STATUS_CHANGED, loggedIn: false});
      // redirect to the root
      history.push('/');
    } catch (e) {
      dispatch({ type: LOGOUT_USER_FAILED });
    }
  };
};