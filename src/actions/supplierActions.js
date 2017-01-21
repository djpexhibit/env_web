import * as types from './actionTypes';
import supplierApi from '../api/mockSupplierApi';



export function loadSuppliersSuccess(suppliers){
    return{type:types.LOAD_SUPPLIERS_SUCCESS, suppliers}
}

export function loadSuppliers(){
    return function(dispatch){
        return supplierApi.getAllSuppliers().then(suppliers => {
            dispatch(loadSuppliersSuccess(suppliers));
        }).catch(error => {
            throw(error);
        });
    }
}