import {combineReducers} from 'redux';
import items from './itemReducer';
import itemDetails from './itemDetailsReducer';
import suppliers from './supplierReducer';
import cart from './cartReducer';
import checkout from './checkoutReducer';
import isLoading from './loadingMaskReducer';

const rootReducer = combineReducers({
    items,suppliers,cart,itemDetails,checkout,isLoading
});

export default rootReducer;