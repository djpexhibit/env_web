import * as types from './actionTypes';
import advApi from '../api/advApi';
import {setLoadingMask, removeLoadingMask} from './loadingMaskAction';

export function addAdv(adv){
    return function(dispatch){
        dispatch(setLoadingMask());
        return advApi.addAdv(adv).then( success => {
            dispatch(removeLoadingMask());
            dispatch(addAdvSuccess(success));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        })
    }
}


export function addAdvSuccess(status){
	return {type: types.ADD_ADV_SUCCESS, status}
}