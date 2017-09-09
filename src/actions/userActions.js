import * as types from './actionTypes';
import userApi from '../api/usersApi';
import {setLoadingMask, removeLoadingMask} from './loadingMaskAction';

export function loadUsers(){
	return function(dispatch){
		dispatch(setLoadingMask());
		return userApi.getUsers().then(users => {
			dispatch(removeLoadingMask());
			dispatch(loadUsersSuccess(users));
		}).catch(error => {
			dispatch(removeLoadingMask());
			throw(error);
		});
	}
}

export function loadUsersSuccess(users){
    return{type:types.LOAD_USERS_SUCCESS, users}
}



export function loadUserByIdSuccess(user){
    return {type: types.LOAD_USER_BY_ID_SUCCESS, user}
}

export function loadUserById(id){
    return function(dispatch){
        dispatch(setLoadingMask());
        return userApi.getUserById(id).then( user => {
            dispatch(removeLoadingMask());
            dispatch(loadUserByIdSuccess(user));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        })
    }
}


export function removeUser(user){
    return function(dispatch){
        dispatch(setLoadingMask());
        return userApi.removeUser(user).then(users => {
            dispatch(removeLoadingMask());
            dispatch(loadUsersSuccess(users));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        });
    }
}

export function loadProfUsers(){
    return function(dispatch){
        dispatch(setLoadingMask());
        return userApi.loadProfUsers().then( users => {
            dispatch(removeLoadingMask());
            dispatch(loadProfUsersSuccess(users));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        })
    }
}

export function loadProfUsersSuccess(users){
    return{type:types.LOAD_PROF_USERS_SUCCESS, users}
}


export function addToPanel(id){
	return function(dispatch){
		dispatch(setLoadingMask());
		return userApi.addToPanel(id).then(user => {
				dispatch(removeLoadingMask());
				dispatch(addToPanelSuccess(user));
		}).catch(error => {
				dispatch(removeLoadingMask());
				throw(error);
		});
	}
}

export function addToPanelSuccess(user){
    return{type:types.ADD_TO_PANEL_SUCCESS, user}
}

export function verifyAddToPanel(id){
	return function(dispatch){
		dispatch(setLoadingMask());
		return userApi.verifyAddToPanel(id).then(user => {
				dispatch(removeLoadingMask());
				dispatch(verifyAddToPanelSuccess(user));
		}).catch(error => {
				dispatch(removeLoadingMask());
				throw(error);
		});
	}
}

export function verifyAddToPanelSuccess(user){
    return{type:types.VERIFY_ADD_TO_PANEL_SUCCESS, user}
}

export function verify(id){
	return function(dispatch){
		dispatch(setLoadingMask());
		return userApi.verify(id).then(user => {
				dispatch(removeLoadingMask());
				dispatch(verifySuccess(user));
		}).catch(error => {
				dispatch(removeLoadingMask());
				throw(error);
		});
	}
}

export function verifySuccess(user){
    return{type:types.VERIFY_SUCCESS, user}
}


export function editUser(user){
	return function(dispatch){
		dispatch(setLoadingMask());
		return userApi.editUser(user).then(userRet => {
				dispatch(removeLoadingMask());
				dispatch(loadUserByIdSuccess(user));
		}).catch(error => {
				dispatch(removeLoadingMask());
				throw(error);
		});
	}
}
