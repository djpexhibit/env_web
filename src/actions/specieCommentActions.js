import * as types from './actionTypes';
import speciesApi from '../api/speciesApi';
import {setLoadingMask, removeLoadingMask} from './loadingMaskAction';




export function loadSpeciesCommentsByIdSuccess(comments){
    return {type: types.LOAD_SPECIES_COMMENTS_BY_ID_SUCCESS, comments}
}

export function loadSpeciesCommentById(id){
    return function(dispatch){
        dispatch(setLoadingMask());
        return speciesApi.getSpeciesCommentsById(id).then( comments => {
            dispatch(removeLoadingMask());
            dispatch(loadSpeciesCommentsByIdSuccess(comments));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        })
    }
}



export function addSpeciesCommentSuccess(status){
    return {type: types.ADD_SPECIES_COMMENT_SUCCESS, status}
}


export function addSpeciesComment(comment){
    return function(dispatch){
        dispatch(setLoadingMask());
        return speciesApi.addSpeciesComment(comment).then( success => {
            dispatch(removeLoadingMask());
            //dispatch(addSpeciesCommentSuccess(success));
            debugger;
            dispatch(loadSpeciesCommentById(comment.species_id));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        })
    }
}
