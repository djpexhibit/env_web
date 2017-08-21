import {combineReducers} from 'redux';
import items from './itemReducer';
import complains from './complainReducer';
import complain from './complainDetailReducer';
import species from './specieReducer';
import specie from './specieDetailReducer';
import users from './userReducer';
import user from './userDetailReducer';
import profUsers from './profUsersReducer';
import isLoading from './loadingMaskReducer';
import session from './sessionReducer';
import comments from './commentsReducer';
import speciesComments from './speciesCommentsReducer';
import advs from './advReducer';
import events from './eventReducer';
import login from './loginReducer';

const rootReducer = combineReducers({
    items,
    complains,
    isLoading,
    session,
    complain,
    species,
    specie,
    users,
    user,
    profUsers,
    comments,
    advs,
    events,
    login,
    speciesComments
});

export default rootReducer;
