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
    GET_ALL_COMPLAINT_SUCCESS,
    DELETE_COMPLAINT_STARTED,
    DELETE_COMPLAINT_SUCCESS,
    DELETE_COMPLAINT_FAILED
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
            let newComplaints =state.complaints;
            if(action.changedComplaint[0].status === 'close'){    //if complaint status is clode then delete that complaint from complaint array
                newComplaints = state.complaints.filter(function (obj) {
                    return obj._id !== action.deletedComplaint[0]._id
                })

            }else{
               newComplaints.map((items) => {  //if complaint status is resolve then change status in state
                    if(items._id === action.changedComplaint[0]._id){
                        items.status='resolve'
                    }
                });
            }
            return{
                ...state,

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
        case DELETE_COMPLAINT_STARTED:{
            return{
                ...state
            }
        }
        case DELETE_COMPLAINT_SUCCESS:{
            let id = action.deletedComplaint[0]._id;
            let newMyComplaints;
            let adminComplaints
            newMyComplaints = state.myComplaints.filter(function(el) { //delete my complaint
                return el._id !== id;
            });

            adminComplaints = state.complaints.filter(function (obj) { //delete complaint from admin state
              return obj._id !== action.deletedComplaint[0]._id
            });
            return{
                ...state,
                myComplaints:newMyComplaints,
                complaints:adminComplaints
            }
        }
        case DELETE_COMPLAINT_FAILED:{
            return{
                ...state,
                err:action.err
            }
        }
    }
    return state;
};