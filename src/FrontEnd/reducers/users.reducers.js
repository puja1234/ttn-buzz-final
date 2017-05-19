import {
    FETCH_USER_STARTED,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED,
} from '../config/config.constants'

const initialState ={
    users:null,
    loading:true,
    err:null
}

export const userFetch = (state=initialState,action) => {

    switch (action.type) {
        case FETCH_USER_STARTED: {
            console.log("fetch user started in reducer")
            return {
                ...state,
            }
        }

        case FETCH_USER_SUCCESS: {
            console.log("fetch user success in reducer", action.user)
            return {
                ...state,
                loading: false,
                users: action.user
            }
        }

        case FETCH_USER_FAILED: {
            console.log("fetch user error in reducer")
            return {
                ...state,
                loading: false,
                err: action.err,

            }
        }
    }
    return state
}
