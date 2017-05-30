import find from 'lodash/find';
import uniqBy from 'lodash/uniqBy'
import {
    POST_BUZZ_STARTED,
    POST_BUZZ_SUCCESS,
    POST_BUZZ_FAILED,
    FETCH_POST_STARTED,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILED,
    FETCH_USER_STARTED,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILED,
    LIKE_POST_STARTED,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILED,
    DELETE_POST_STARTED,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILED,
    GETTING_TOTAL_STARTED,
    GETTING_TOTAL_SUCCESS,
    GETTING_TOTAL_FAILED,
    FETCH_CATEGORY_BUZZ_SUCCESS
} from '../config/config.constants'

const initialState ={

    buzz : [],
    loading:false,
    err:null,
    total:'',
    offset:0,
    category:[]
};

export const postFetch = (state=initialState,action) => {
    switch (action.type){
        case POST_BUZZ_STARTED:{
            return{
               ...state,
                loading:true,
            }
        }

        case POST_BUZZ_SUCCESS :{
            state.buzz.unshift(action.postBuzz);  //add buzz at start of buzz array
            let newBuzz = state.buzz;
            return{
                ...state,
                loading:false,
               buzz:newBuzz,
                offset:state.offset+1
            }
        }

        case POST_BUZZ_FAILED:{
            return {
                ...state,
                loading : false,
                err: action.err,

            }
        }

        case FETCH_POST_STARTED:{
            return{
                ...state,
                loading:true,
            }
        }

        case FETCH_POST_SUCCESS:{
            let newBuzz = state.buzz.concat(action.postBuzz);
            newBuzz = uniqBy(newBuzz,'_id');
            return{
                ...state,
                loading:false,
                buzz:newBuzz,
                offset:state.offset+2
            }
        }

        case FETCH_POST_FAILED:{
            return {
                ...state,
                loading : false,
                err: action.err,

            }
        }

        case LIKE_POST_STARTED: {
            return {
                ...state,
            }
        }

        case LIKE_POST_SUCCESS : {
            let newBuzz = state.buzz;
            let removePost= find(newBuzz, function(post) { return post._id == action.likes[0]._id; });
            let indexOf_removePost = newBuzz.indexOf(removePost);
            newBuzz.splice(indexOf_removePost,1,action.likes[0]);
            return{
                ...state,
                buzz:newBuzz
            }
        }

        case LIKE_POST_FAILED: {
            return {
                ...state,
                err: action.err,
            }
        }
        case DELETE_POST_STARTED:{
            return {
                ...state
            }
        }
        case DELETE_POST_SUCCESS:{
            let newBuzz = state.buzz;
            let newPosts = state.buzz.filter(function (obj) {
                return obj._id !== action.deletedPost[0]._id;
            });
            return{
                ...state,
                buzz:newPosts,
                offset:state.offset-1
            }
        }
        case DELETE_POST_FAILED : {
            return {
                ...state,
                err:action.err
            }
        }
        case GETTING_TOTAL_STARTED:{
            return {
                ...state
            }
        }

        case GETTING_TOTAL_SUCCESS:{
            return{
                total:action.totalBuzz,
                ...state
            }
        }
        case GETTING_TOTAL_FAILED:{
            return{
                ...state,
                err:action.err
            }
        }
        case FETCH_CATEGORY_BUZZ_SUCCESS:{
            return{
                ...state,
                category:action.categoryBuzz
            }
        }
    }
    return state;
};