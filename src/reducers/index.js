import {combineReducers} from 'redux';
import items from './itemReducer';
import complains from './complainReducer';
import complain from './complainDetailReducer';
import isLoading from './loadingMaskReducer';
import session from './sessionReducer';

const rootReducer = combineReducers({
    items,
    complains,
    isLoading,
    session,
    complain
});

export default rootReducer;