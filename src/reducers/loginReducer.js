import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';

export default function loginReducer(state = initialState.loggedUser, action) {
  switch(action.type) {
    case types.LOGGED_USER:
    	return action.loggedUser;
    case types.LOGOUT_USER:
      return null;
    default:
      return state;
  }
}
