import * as types from './actionTypes';
import itemApi from '../api/itemApi';
import {setLoadingMask, removeLoadingMask} from './loadingMaskAction';

export function addItem(item){
    return {type: types.ADD_ITEM , item }        // short for item:item
}

export function loadItemsSuccess(items){
    return{type:types.LOAD_ITEMS_SUCCESS, items}
}

export function loadItems(){
    
    return function(dispatch){
        dispatch(setLoadingMask());
        return itemApi.getAllItems().then(items => {
            dispatch(removeLoadingMask());
            dispatch(loadItemsSuccess(items));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        });
    }
}

export function searchItemsSuccess(items){
    return {type:types.SEARCH_ITEMS_SUCCESS, items}
}

export function searchItems(key){
    return function(dispatch){
        dispatch(setLoadingMask());
        return itemApi.searchItems(key).then(items => {
            dispatch(removeLoadingMask());
            dispatch(searchItemsSuccess(items));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        });
    }
}


export function loadItemsByTypeSuccess(items){
    return{type:types.LOAD_ITEMS_BY_TYPE_SUCCESS, items}
}

export function loadItemsByType(type){
    return function(dispatch){
         dispatch(setLoadingMask());
        return itemApi.getAllItemsByType(type).then(items => {
            dispatch(removeLoadingMask());
            dispatch(loadItemsByTypeSuccess(items));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        });
    }
}


export function loadLimitedItemsSuccess(limitedItems){
    return{type:types.LOAD_LIMITED_ITEMS_SUCCESS, limitedItems}
}

export function loadLimitedItems(){
    return function(dispatch){
        dispatch(setLoadingMask());
        return itemApi.getLimitedItems().then(items => {
            dispatch(removeLoadingMask());
            dispatch(loadLimitedItemsSuccess(items));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        });
    }
}

export function loadItemByIdSuccess(item){
    return {type: types.LOAD_ITEM_BY_ID_SUCCESS, item}
}

export function loadItemById(id){
    return function(dispatch){
        dispatch(setLoadingMask());
        return itemApi.getItemById(id).then( item => {
            dispatch(removeLoadingMask());
            dispatch(loadItemByIdSuccess(item[0]));
        }).catch(error => {
            dispatch(removeLoadingMask());
            throw(error);
        })
    }
}