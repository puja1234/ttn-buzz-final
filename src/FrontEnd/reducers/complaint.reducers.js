import {
    POST_COMPLAINT_STARTED,
    POST_COMPLAINT_SUCCESS,
    POST_COMPLAINT_FAILED,
    GET_COMPLAINT_STARTED,
    GET_COMPLAINT_SUCCESS,
    GET_COMPLAINT_FAILED,
    CHANGE_COMPLAINT_STARTED,
    CHANGE_COMPLAINT_SUCCESS,
    CHANGE_COMPLAINT_FAILED,
    GET_ALL_COMPLAINT_SUCCESS
}from '../config/config.constants'

let initialState ={
    myComplaints:[],
    complaints :[],
    err:''
};

export const complaintReducer = (state=initialState,action) => {
    switch (action.type){
        case POST_COMPLAINT_STARTED:{
            return{
                ...state
            }
        }
        case POST_COMPLAINT_SUCCESS:{
            return{
                ...state,

            }
        }
        case POST_COMPLAINT_FAILED:{
            return {
                ...state,
                err:action.err
            }
        }
        case GET_COMPLAINT_STARTED:{
            return{
                ...state
            }
        }
        case GET_COMPLAINT_SUCCESS:{
            return{
                ...state,
                complaints:action.getComplaint
            }
        }
        case GET_COMPLAINT_FAILED:{
            return{
                ...state,
                err:action.err
            }
        }
        case CHANGE_COMPLAINT_STARTED:{
            return{
                ...state
            }
        }
        case CHANGE_COMPLAINT_SUCCESS:{
            let newComplaints = state.complaints;
            let removePost= find(newComplaints, function(complaint) { return complaint._id == action.changedComplaint[0]._id; });
            let indexOf_removePost = newComplaints.indexOf(removePost);
            if(action.changedComplaint[0].status === 'resolve')
            newComplaints[indexOf_removePost].status = 'resolve';
            else
            {
                 newComplaints = state.buzz.filter(function (obj) {
                    return obj._id !== action.changedComplaint[0]._id;
                })
            }
            return{
                ...state,
                complaints:newComplaints
            }
        }
        case CHANGE_COMPLAINT_FAILED:{
            return{
                ...state
            }
        }
        case GET_ALL_COMPLAINT_SUCCESS:{
            return{
                ...state,
                myComplaints:action.allcomplaints
            }
        }
    }
    return state;
};