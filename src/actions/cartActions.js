import * as types from './actionTypes';
import itemApi from '../api/itemApi';


export function addToCart(item){
    return {type:types.ADD_TO_CART, item}
}


export function removeFromCart(item){
    return{type:types.REMOVE_FROM_CART, item}
}

export function buyItems(checkout){
    return function(dispatch){
        return itemApi.buyItems(checkout).then( item => {
            dispatch(buyItemsSuccess(item));
        }).catch(error => {
            throw(error);
        })
    }
}

export function buyItemsSuccess(item){
    return {type:types.BUY_ITEMS_SUCCESS,item}
}