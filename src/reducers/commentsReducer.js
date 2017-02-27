import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function commentsReducer(state = initialState.comments, action){
    switch(action.type){
        case types.LOAD_COMMENTS_BY_ID_SUCCESS:
            return action.comments;
        default: 
            return state;
    }
}