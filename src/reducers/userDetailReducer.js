import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userDetailsReducer(state = initialState.user, action){
    switch(action.type){
        case types.LOAD_USER_BY_ID_SUCCESS:
            return action.user;
        default:
            return state;
    }
}
