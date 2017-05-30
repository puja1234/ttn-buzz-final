import {
    commentStarted,
    commentSuccess,
    commentFailed,
    fetchCommentCallStarted,
    fetchCommentCallSuccess,
    fetchCommentCallFailed,
    deleteCommentStarted,
    deleteCommentSuccess,
    deleteCommentFailed,
} from '../app.actions'
export const asyncComment = (commentPost) => {
    //  console.log(commentPost)
    return (dispatch) => {
        dispatch(commentStarted());
        fetch('http://localhost:3000/api/Comment',{
            credentials: 'include',
            method:'put',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({commentPost}),
        })
            .then(response => response.json())
            .then((data) => {
                dispatch(commentSuccess(data));
                dispatch(asyncGetComment())
            })
            .catch(err => {
                dispatch(commentFailed(err));
            })
    }
}

export const asyncGetComment = () => {
    return (dispatch) => { // this is store's dispatch method
        dispatch(fetchCommentCallStarted()); // call started
        fetch('http://localhost:3000/api/Comment', {
            credentials: 'include',
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(fetchCommentCallSuccess(data)); 	// success
            })
            .catch(err => {
                dispatch(fetchCommentCallFailed(err));		// failure
            });
    }
};

export const deleteComment = (postId) => {
    return (dispatch) => {
        dispatch(deleteCommentStarted());
        fetch('http://localhost:3000/api/Comment',{
            credentials: 'include',
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({postId})
        })
            .then(response => response.json())
            .then(data => {
                dispatch(deleteCommentSuccess(data));

            })
            .catch(err => {
                dispatch(deleteCommentFailed(err))
            })
    }
};