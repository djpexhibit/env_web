import * as types from './actionTypes';
import sessionApi from '../api/sessionApi';
import { Router, browserHistory } from 'react-router'

export function loginSuccess() {
	return {type: types.LOG_IN_SUCCESS}
}

export function loggedUser(user){
	let loggedUser = JSON.parse(user);
	return {type: types.LOGGED_USER, loggedUser}
}

export function logInUser(credentials) {
	return function(dispatch) {
		return sessionApi.login(credentials).then(response => {
			sessionStorage.setItem('jwt', response.jwt);
			sessionStorage.setItem('user_session', JSON.stringify(response.session))
			dispatch(loginSuccess());
			if(sessionStorage.jwt==='true'){
				browserHistory.push("/complains");
				dispatch(loggedUser(JSON.stringify(response.session)));
			}
			else{
				browserHistory.push("login?error=true");
			}
		}).catch(error => {
			throw(error);
		});
	};
}

export function logOutUser() {
	return function(dispatch){
		dispatch(logoutSession());
		dispatch(logoutUserObj());

	};

}

export function logoutSession(){
	sessionStorage.removeItem('jwt');
	sessionStorage.removeItem('user_session');
	return {type: types.LOG_OUT}
}


export function logoutUserObj(){
	return {type: types.LOGOUT_USER}
}
