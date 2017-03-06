import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function advReducer(state = initialState.advs, action){
    switch(action.type){
        case types.ADD_ADV_SUCCESS:
            return [...state, Object.assign({}, action.adv)]
        default: 
            return state;
    }
}