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
            console.log(action.changedComplaint[0],state.complaints,"<<<<<<<<<<<<<<<<<<<<<");
            let newComplaints =state.complaints;
            if(action.changedComplaint[0].status === 'close'){
                newComplaints = state.complaints.filter(function (obj) {
                    return obj._id !== action.deletedComplaint[0]._id
                })

            }else{
               newComplaints.map((items) => {
                    if(items._id === action.changedComplaint[0]._id){
                       console.log("object whose status is to be chaged is",items);
                       items.status='resolve'
                    }
                });

            }
            console.log(newComplaints,"<<<<<<<<<<<newcomp<<<<<<<<<<<<<<<<<<")
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
            console.log("started>>>>>>>>>>>>>>>>>>>>>>>>>>")
            return{
                ...state
            }
        }
        case DELETE_COMPLAINT_SUCCESS:{
            console.log("---------------in complaint reducer document deleted is----------",action.deletedComplaint);
            let id = action.deletedComplaint[0]._id;
            let newMyComplaints;
            let adminComplaints
            newMyComplaints = state.myComplaints.filter(function(el) {
                return el._id !== id;
            });

            console.log('my complaints----------------------------',state.myComplaints);
          console.log('new complaints----------------------------',newMyComplaints);
         adminComplaints = state.complaints.filter(function (obj) {
              return obj._id !== action.deletedComplaint[0]._id
               });
            return{
                ...state,
                myComplaints:newMyComplaints,
                complaints:adminComplaints
            }
        }
        case DELETE_COMPLAINT_FAILED:{
            console.log("error >>_____________")
            return{
                ...state,
                err:action.err
            }
        }
    }
    return state;
};