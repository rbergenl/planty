import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER_SUCCESS,
  LOGGED_IN_STATUS_CHANGED
} from '../actions';

export const initialState = {
  loggedIn: (sessionStorage.getItem('isLoggedIn') === 'true') ? true : false,
  user: '',
  given_name: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {
                ...initialState,
                user: action.user,
                given_name: action.user.given_name
            };
        case LOGGED_IN_STATUS_CHANGED:
            return {
                ...state,
                loggedIn: action.loggedIn
            };
        case LOGOUT_USER_SUCCESS:
            return {
                ...initialState
            };
        default:
            return state;
    }
};