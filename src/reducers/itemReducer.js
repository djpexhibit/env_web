import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function itemReducer(state = initialState.items, action){
    switch(action.type){
        case types.ADD_ITEM:
            return [...state, Object.assign({}, action.item)]
        case types.LOAD_ITEMS_SUCCESS:
            return action.items;
        case types.LOAD_LIMITED_ITEMS_SUCCESS:
            return action.limitedItems;
        case types.LOAD_ITEMS_BY_TYPE_SUCCESS:
            return action.items;
        case types.SEARCH_ITEMS_SUCCESS:
            return action.items;
        default: 
            return state;
    }
}