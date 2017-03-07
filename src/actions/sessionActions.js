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
			dispatch(loginSuccess());
			if(sessionStorage.jwt==='true'){
				browserHistory.push("/home/complains");
			}
			else{
				browserHistory.push("?error=true");
			}
		}).catch(error => {
			throw(error);
		});
	};
}