
import {
    complaintStarted,
    complaintSuccess,
    complaintFailed,
    complaintGetStarted,
    complaintGetSuccess,
    complaintGetFailed,
    changeStatusStarted,
    changeStatusSuccess,
    changeStatusFailed,
    myComplaintGetSuccess,
    deleteComplaintStarted,
    deleteComplaintSuccess,
    deleteComplaintFailed
} from '../app.actions'
export const asyncPostComplaint = (complaint) => {

    // console.log("inside async of complaint$$$$$$$$$$$$$$$4",complaint);
    return (dispatch) => {
        dispatch(complaintStarted());
        fetch('http://localhost:3000/api/Complaint',{
            credentials: 'include',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(complaint),
        })
            .then(response => response.json())
            .then(data => {
                dispatch(complaintSuccess(data));
                dispatch(asyncGetMyComplaints());
                dispatch(asyncGetComplaints());
            })
            .catch(err => {
                dispatch(complaintFailed(err))
            })
    }
};

export const asyncGetComplaints = () => {

    return (dispatch) => {
        dispatch(complaintGetStarted());
        fetch('http://localhost:3000/api/Complaint',{
            credentials: 'include',
            method: 'get',

        })
            .then(response => response.json())
            .then(data => {
                dispatch(complaintGetSuccess(data));
            })
            .catch(err => {
                dispatch(complaintGetFailed(err))
            })
    }
};

export const asyncUpdateStatus = (id,status) => {

    let statusData = {
        id:id,
        status:status
    };
    return (dispatch) => {
        dispatch(changeStatusStarted());
        fetch('http://localhost:3000/api/Complaint',{
            credentials: 'include',
            method:'put',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({statusData}),
        })
            .then(response => response.json())
            .then((data) => {
                dispatch(changeStatusSuccess(data));
                dispatch(asyncGetComplaints())
            })
            .catch(err => {
                dispatch(changeStatusFailed(err));
            })
    }
};

export const asyncGetMyComplaints =() => {
    return (dispatch) => {
        dispatch(complaintGetStarted());
        fetch('http://localhost:3000/api/myComplaint',{
            credentials: 'include',
            method: 'get',
        })
            .then(response => response.json())
            .then(data => {
                dispatch(myComplaintGetSuccess(data));
            })
            .catch(err => {
                dispatch(complaintGetFailed(err))
            })
    }
};

export const asyncDeleteComplaint = (id) => {
    //  console.log("id to be deleted is ,",id);
    return (dispatch) => {
        dispatch(deleteComplaintStarted());
        fetch('http://localhost:3000/api/Complaint', {
            credentials: 'include',
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id)
        })
            .then(response => response.json())
            .then(data => {
                dispatch(deleteComplaintSuccess(data));

            })
            .catch(err => {
                dispatch(deleteComplaintFailed(err))
            })

    }
};