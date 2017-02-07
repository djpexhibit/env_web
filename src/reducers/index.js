import {combineReducers} from 'redux';
import items from './itemReducer';
import isLoading from './loadingMaskReducer';
import session from './sessionReducer';

const rootReducer = combineReducers({
    items,
    isLoading,
    session
});

export default rootReducer;