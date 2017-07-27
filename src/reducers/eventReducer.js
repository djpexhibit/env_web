import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function eventReducer(state = initialState.events, action){
    switch(action.type){
        case types.ADD_EVENT_SUCCESS:
            return [...state, Object.assign({}, action.events)]
        case types.LOAD_EVENTS_SUCCESS:
            return action.events;
        case types.DELETE_EVENT_SUCCESS:
            return action.events;
        default:
            return state;
    }
}
