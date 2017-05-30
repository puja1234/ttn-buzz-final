import {
    COMMENT_POST_STARTED,
    COMMENT_POST_SUCCESS,
    COMMENT_POST_FAILED,
    GET_COMMENT_STARTED,
    GET_COMMENT_SUCCESS,
    GET_COMMENT_FAILED,
    DELETE_COMMENT_STARTED,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILED
}from './../config/config.constants'

let initialState = {
    commentPost : [],
    loading:false,
    err:null
}

export const commentReducer = (state=initialState,action) => {
    switch (action.type) {
        case COMMENT_POST_STARTED : {
            return{
                loading:true,
                ...state
            }
        }
        case COMMENT_POST_SUCCESS : {
            return {
                ...state
            }
        }
        case COMMENT_POST_FAILED : {
            return{
                loading:false,
                err:action.err,
                ...state
            }
        }
        case GET_COMMENT_STARTED : {
            return {
                ...state
            }
        }
        case GET_COMMENT_SUCCESS:{
            return{
                ...state,
                commentPost:action.commenting
            }
        }
        case GET_COMMENT_FAILED:{
            return {
                ...state,
                err:action.err
            }
        }
        case DELETE_COMMENT_STARTED:{
            return{
                ...state
            }
        }
        case DELETE_COMMENT_SUCCESS:{
            return{
                ...state,

            }
        }
        case DELETE_COMMENT_FAILED:{
            return{
                ...state,
                err:action.err
            }
        }
    }
    return state;
}