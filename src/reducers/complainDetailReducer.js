import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function complianDetailsReducer(state = initialState.complain, action){
    switch(action.type){
        case types.LOAD_COMPLAIN_BY_ID_SUCCESS:
            return action.complain;
        default: 
            return state;
    }
}

