import {combineReducers} from 'redux';
import items from './itemReducer';
import complains from './complainReducer';
import complain from './complainDetailReducer';
import isLoading from './loadingMaskReducer';
import session from './sessionReducer';
import comments from './commentsReducer';
import advs from './advReducer';

const rootReducer = combineReducers({
    items,
    complains,
    isLoading,
    session,
    complain,
    comments,
    advs
});

export default rootReducer;