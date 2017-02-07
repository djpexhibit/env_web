import * as types from './actionTypes';
import itemApi from '../api/itemApi';
import {setLoadingMask, removeLoadingMask} from './loadingMaskAction';

export function addItem(item){
    return {type: types.ADD_ITEM , item }        // short for item:item
}
