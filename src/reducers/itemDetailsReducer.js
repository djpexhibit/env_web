import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function itemDetailsReducer(state = initialState.item, action){
    switch(action.type){
        case types.LOAD_ITEM_BY_ID_SUCCESS:
            return action.item;
        default: 
            return state;
    }
}