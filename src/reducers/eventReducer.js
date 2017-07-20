import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function eventReducer(state = initialState.events, action){
    switch(action.type){
        case types.ADD_EVENT_SUCCESS:
            return [...state, Object.assign({}, action.events)]
        default:
            return state;
    }
}
