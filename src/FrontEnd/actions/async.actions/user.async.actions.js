import {
    apiCallStarted,
    apiCallSuccess,
    apiCallFailed,
} from '../app.actions'

export const asyncActionFetchUserDetail = () => {
    return (dispatch) => { // this is store's dispatch method
        dispatch(apiCallStarted()); // call started
        fetch('http://localhost:3000/api/User',{
            credentials : 'include'
        }) .then(response => response.json())
            .then(data => {
                console.log(data, "data");
                dispatch(apiCallSuccess(data));
            })
            .catch(err => {
                dispatch(apiCallFailed(err));		// failure
            });
    }
};