import * as types from './actionTypes';
import eventApi from '../api/eventApi';
import {setLoadingMask, removeLoadingMask} from './loadingMaskAction';

export function addEvent(){
	return function(dispatch){
		dispatch(setLoadingMask());
		return eventApi.addEvent().then(complains => {
			dispatch(removeLoadingMask());
			dispatch(addEventSuccess(events));
		}).catch(error => {
			dispatch(removeLoadingMask());
			throw(error);
		});
	}
}

export function addEventSuccess(events){
    return{type:types.ADD_EVENT_SUCCESS, events}
}
