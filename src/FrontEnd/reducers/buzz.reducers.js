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
    GETTING_TOTAL_FAILED
} from '../config/config.constants'

const initialState ={

    buzz : [],
    loading:false,
    err:null,
    total:'',
    offset:0,
};

export const postFetch = (state=initialState,action) => {

    switch (action.type){

        case POST_BUZZ_STARTED:{
            console.log("buzz started in reducer")
            return{
               ...state,
                loading:true,
            }
        }

        case POST_BUZZ_SUCCESS :{
            console.log("buzz success in reducer");
             state.buzz.unshift(action.postBuzz);
            let newBuzz = state.buzz;
            console.log("data after inserting post in buzz reducer is ****************",newBuzz);
            return{
                ...state,
                loading:false,
               buzz:newBuzz,
                offset:state.offset+1
            }
        }

        case POST_BUZZ_FAILED:{
            console.log("buzz error in reducer");
            return {
                ...state,
                loading : false,
                err: action.err,

            }
        }

        case FETCH_POST_STARTED:{
            console.log("buzz started in reducer")
            return{
                ...state,
                loading:true,
            }
        }

        case FETCH_POST_SUCCESS:{
            console.log("buzz started in reducer");
           let newBuzz = state.buzz.concat(action.postBuzz);
           newBuzz = uniqBy(newBuzz,'_id');
           console.log("unique values in state is&&&&&&&&&&&&&&&&&",newBuzz);
            return{
                ...state,
                loading:false,
                buzz:newBuzz,
                offset:state.offset+2
            }
        }

        case FETCH_POST_FAILED:{
            console.log("buzz error in reducer");
            return {
                ...state,
                loading : false,
                err: action.err,

            }
        }

        case LIKE_POST_STARTED: {
            console.log(state.buzz,'+++++++++++');
            console.log("like post in reducer started");
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
            console.log("like post in reducer");
            return {
                ...state,
                err: action.err,
            }
        }
        case DELETE_POST_STARTED:{
            console.log("before deletion",state.buzz);
            return {
                ...state
            }
        }
        case DELETE_POST_SUCCESS:{
            let newBuzz = state.buzz;
             console.log("data in buzz are**********",newBuzz);
            console.log("data deleted is",action.deletedPost[0]);
            let newPosts = state.buzz.filter(function (obj) {
                return obj._id !== action.deletedPost[0]._id;
            })
           //  let indexOfDelete = newBuzz.indexOf(action.deletedPost[0]);
           // console.log("index found in buzz of deleted data is******",indexOfDelete);
            // newBuzz.splice(indexOfDelete,1);
            // console.log("new buzz after delete is *******",newBuzz);
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
    }
    return state;
};