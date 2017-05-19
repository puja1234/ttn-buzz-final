import {
    FETCH_USER_STARTED,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED,
    POST_BUZZ_STARTED,
    POST_BUZZ_SUCCESS,
    POST_BUZZ_FAILED,
    FETCH_POST_STARTED,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILED,
    LIKE_POST_STARTED,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILED,
    COMMENT_POST_STARTED,
    COMMENT_POST_SUCCESS,
    COMMENT_POST_FAILED,
    GET_COMMENT_STARTED,
    GET_COMMENT_SUCCESS,
    GET_COMMENT_FAILED,
    DELETE_POST_STARTED,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILED,
    DELETE_COMMENT_STARTED,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILED
} from './../config/config.constants'

export function apiCallStarted() {
    return { type:FETCH_USER_STARTED };
}

export function apiCallSuccess(user) {
    console.log(user,"inside action..............................")
    return { type:FETCH_USER_SUCCESS,user };
}

export function apiCallFailed(err) {
    return { type:FETCH_USER_FAILED,err };
}

export function postBuzzCallStarted() {
    return { type:POST_BUZZ_STARTED };
}

export function postBuzzCallSuccess(postBuzz) {
    return { type:POST_BUZZ_SUCCESS,postBuzz };
}

export function postBuzzCallFailed(err) {
    return { type:POST_BUZZ_FAILED,err }
}

export function fetchPostCallStarted() {
    return { type:FETCH_POST_STARTED };
}

export function fetchPostCallSuccess(postBuzz) {
    return { type:FETCH_POST_SUCCESS,postBuzz };
}

export function fetchPostCallFailed(err) {
    return { type:FETCH_POST_FAILED,err}
}

export  function likePostStarted() {
    return { type:LIKE_POST_STARTED }
}

export  function likePostSuccess(likes) {
    return { type:LIKE_POST_SUCCESS,likes }
}

export  function likePostFailed(err) {
    return { type:LIKE_POST_FAILED,err }
}

export function commentStarted() {
    return { type:COMMENT_POST_STARTED }
}

export function commentSuccess() {
    return { type:COMMENT_POST_SUCCESS }
}

export function commentFailed(err) {
    return { type:COMMENT_POST_FAILED,err }
}

export function fetchCommentCallStarted() {
    return { type:GET_COMMENT_STARTED }
}

export function fetchCommentCallSuccess(commenting) {
    return { type:GET_COMMENT_SUCCESS,commenting }
}

export function fetchCommentCallFailed(err) {
    return { type:GET_COMMENT_FAILED,err }
}

export function deletePostStarted() {
    return { type:DELETE_POST_STARTED }
}

export function deletePostSuccess() {
    return { type:DELETE_POST_SUCCESS }
}

export function deletePostFailed(err) {
    return { type:DELETE_POST_FAILED ,err}
}

export function deleteCommentStarted() {
    return { type:DELETE_COMMENT_STARTED }
}

export function deleteCommentSuccess(remainComment) {
    return { type:DELETE_COMMENT_SUCCESS,remainComment }
}

export function deleteCommentFailed(err) {
    return { type:DELETE_COMMENT_FAILED,err }
}



