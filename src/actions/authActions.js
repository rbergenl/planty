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
