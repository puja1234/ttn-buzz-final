import {
    FETCH_USER_STARTED,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED,
} from '../config/config.constants'

const initialState ={
    users:null,
    loading:true,
    err:null
};

export const userFetch = (state=initialState,action) => {
    switch (action.type) {
        case FETCH_USER_STARTED: {
            return {
                ...state,
            }
        }

        case FETCH_USER_SUCCESS: {
            console.log("---------------",action.user);
            return {
                ...state,
                loading: false,
                users: action.user
            }
        }

        case FETCH_USER_FAILED: {
            return {
                ...state,
                loading: false,
                err: action.err,

            }
        }
    }
    return state
};
