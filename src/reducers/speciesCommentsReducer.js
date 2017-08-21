import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function speciesCommentsReducer(state = initialState.speciesComments, action){
    switch(action.type){
        case types.LOAD_SPECIES_COMMENTS_BY_ID_SUCCESS:
            return action.comments;
        default:
            return state;
    }
}
