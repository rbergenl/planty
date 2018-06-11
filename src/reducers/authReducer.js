import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED
} from '../actions';

export const initialState = {
  loggedIn: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {
                loggedIn: true
            };
        default:
            return state;
    }
};