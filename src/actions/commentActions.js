import * as types from './actionTypes';
import complainApi from '../api/complainsApi';
import {setLoadingMask, removeLoadingMask} from './loadingMaskAction';




export function loadCommentsByIdSuccess(comments){
    return {type: types.LOAD_COMMENTS_BY_ID_SUCCESS, comments}
}

export function loadCommentById(id){
    return function(dispatch){
        dispatch(setLoadingMask());
        return complainApi.getCommentsById(id).then( comments => {
            dispatch(removeLoadingMask());
            dispatch(loadCommentsByIdSuccess(comments));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        })
    }
}



export function addCommentSuccess(status){
    return {type: types.ADD_COMMENT_SUCCESS, status}
}


export function addComment(comment){
    return function(dispatch){
        dispatch(setLoadingMask());
        return complainApi.addComment(comment).then( success => {
            dispatch(removeLoadingMask());
            dispatch(addCommentSuccess(success));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        })
    }
}





