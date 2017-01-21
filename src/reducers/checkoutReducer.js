import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function checkoutReducer(state = initialState.checkout, action){
    switch(action.type){
        case types.BUY_ITEMS:
            return [...state, Object.assign({}, action.checkout)]
        default: 
            return state;
    }
}