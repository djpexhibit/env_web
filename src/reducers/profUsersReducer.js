import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function profUsersReducer(state = initialState.profUsers, action){
    switch(action.type){
        case types.LOAD_PROF_USERS_SUCCESS:
            return action.users;
        default:
            return state;
    }
}
