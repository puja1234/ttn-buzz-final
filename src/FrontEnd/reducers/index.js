import {combineReducers} from "redux";

import {postFetch} from './buzz.reducers';
import {userFetch} from './users.reducers';
import {commentReducer} from './comment.reducers'
import {complaintReducer} from './complaint.reducers'

export const reducers = combineReducers({
    postFetch,
    userFetch,
    commentReducer,
    complaintReducer
});

