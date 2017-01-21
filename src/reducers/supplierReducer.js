import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function supplierReducer(state = initialState.suppliers, action){
    switch(action.type){
        case types.LOAD_SUPPLIERS_SUCCESS:
            return action.suppliers;
        default: 
            return state;
    }
}