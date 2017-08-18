import * as types from './actionTypes';
import complainApi from '../api/complainsApi';
import {setLoadingMask, removeLoadingMask} from './loadingMaskAction';

export function loadComplains(){
	return function(dispatch){
		dispatch(setLoadingMask());
		return complainApi.getComplains().then(complains => {
			dispatch(removeLoadingMask());
			dispatch(loadComplainsSuccess(complains));
		}).catch(error => {
			dispatch(removeLoadingMask());
			throw(error);
		});
	}
}

export function loadComplainsSuccess(complains){
    return{type:types.LOAD_COMPLAINS_SUCCESS, complains}
}



export function loadComplainByIdSuccess(complain){
    return {type: types.LOAD_COMPLAIN_BY_ID_SUCCESS, complain}
}

export function loadComplainById(id){
    return function(dispatch){
        dispatch(setLoadingMask());
        return complainApi.getComplainById(id).then( complain => {
            dispatch(removeLoadingMask());
            dispatch(loadComplainByIdSuccess(complain));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        })
    }
}


export function removeComplain(complain){
    return function(dispatch){
        dispatch(setLoadingMask());
        return complainApi.removeComplain(complain).then(complains => {
            dispatch(removeLoadingMask());
            dispatch(loadComplainsSuccess(complains));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        });
    }
}


export function updateAuthority(complainId,authId){
    return function(dispatch){
        dispatch(setLoadingMask());
        return complainApi.updateAuthority(complainId,authId).then( success => {
            dispatch(removeLoadingMask());
            dispatch(loadComplainById(complainId));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        })
    }
}

export function updateAuthoritySuccess(status){
	debugger
    return {type: types.UPDATE_AUTHORITY_SUCCESS, status}
}


export function resolved(complainId){
    return function(dispatch){
        dispatch(setLoadingMask());
        return complainApi.resolved(complainId).then( success => {
            dispatch(removeLoadingMask());
            dispatch(loadComplainById(complainId));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        })
    }
}
