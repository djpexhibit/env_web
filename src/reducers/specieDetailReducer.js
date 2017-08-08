import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function specieDetailsReducer(state = initialState.specie, action){
    switch(action.type){
        case types.LOAD_SPECIE_BY_ID_SUCCESS:
            return action.specie;
        default:
            return state;
    }
}
