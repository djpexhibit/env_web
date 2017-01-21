import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function cartReducer(state = initialState.addedItems, action){
    switch(action.type){
        case types.ADD_TO_CART:
            return [...state, Object.assign({}, action.item)]
        case types.REMOVE_FROM_CART:
            console.log('REMOVIN '+ ' '+ action.item.id);
            return [
                ...state.filter(item => item.id !== action.item.id)
            ]
        default: 
            return state;
    }
}