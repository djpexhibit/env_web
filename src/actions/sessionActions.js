import * as types from './actionTypes';
import sessionApi from '../api/sessionApi';
import { Router, browserHistory } from 'react-router'

export function loginSuccess() {
	return {type: types.LOG_IN_SUCCESS}
}

export function logInUser(credentials) {
	return function(dispatch) {
		return sessionApi.login(credentials).then(response => {
			sessionStorage.setItem('jwt', response.jwt);
			sessionStorage.setItem('user_session', JSON.stringify(response.session))
			dispatch(loginSuccess());
			if(sessionStorage.jwt==='true'){
				browserHistory.push("/complains");
			}
			else{
				browserHistory.push("?error=true");
			}
		}).catch(error => {
			throw(error);
		});
	};
}

export function logOutUser() {
	sessionStorage.removeItem('jwt');
	sessionStorage.removeItem('user_session');
	return {type: types.LOG_OUT}
}
