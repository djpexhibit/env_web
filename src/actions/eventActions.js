import * as types from './actionTypes';
import eventApi from '../api/eventApi';
import {setLoadingMask, removeLoadingMask} from './loadingMaskAction';

export function addEvent(event){
	return function(dispatch){
		dispatch(setLoadingMask());
		return eventApi.addEvent(event).then(events => {
			dispatch(removeLoadingMask());
			//dispatch(addEventSuccess(events.event));
			if(events.status){
				dispatch(loadEvents())
			}
		}).catch(error => {
			dispatch(removeLoadingMask());
			throw(error);
		});
	}
}

export function addEventSuccess(events){
    return{type:types.ADD_EVENT_SUCCESS, events}
}

export function loadEvents(){
	return function(dispatch){
		dispatch(setLoadingMask());

		return eventApi.loadEvents().then(events => {
			dispatch(removeLoadingMask());
			dispatch(loadEventsSuccess(events));
		}).catch(error => {
			dispatch(removeLoadingMask());
			throw(error);
		})
	}
}

export function loadEventsSuccess(events){
	return{type:types.LOAD_EVENTS_SUCCESS, events}
}


export function deleteEvent(id){
	return function(dispatch){
		dispatch(setLoadingMask());

		return eventApi.deleteEvent(id).then(events => {
			dispatch(removeLoadingMask());
			if(events.status){
				dispatch(loadEvents())
			}
			//dispatch(deleteEventSuccess(events));
		}).catch(error => {
			dispatch(removeLoadingMask());
			throw(error);
		})
	}
}


export function deleteEventSuccess(events){
	return{type:types.DELETE_EVENT_SUCCESS, events}
}
