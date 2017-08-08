import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function specieReducer(state = initialState.species, action){
    switch(action.type){
        case types.LOAD_SPECIES_SUCCESS:
            return action.species;
        default:
            return state;
    }
}
