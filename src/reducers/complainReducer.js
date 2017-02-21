import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function complianReducer(state = initialState.complains, action){
    switch(action.type){
        case types.LOAD_COMPLAINS_SUCCESS:
            return action.complains;
        default: 
            return state;
    }
}