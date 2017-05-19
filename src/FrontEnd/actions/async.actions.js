import {
    apiCallStarted,
    apiCallSuccess,
    apiCallFailed,
    postBuzzCallStarted,
    postBuzzCallSuccess,
    postBuzzCallFailed,
    fetchPostCallStarted,
    fetchPostCallSuccess,
    fetchPostCallFailed,
    likePostStarted,
    likePostSuccess,
    likePostFailed,
    commentStarted,
    commentSuccess,
    commentFailed,
    fetchCommentCallStarted,
    fetchCommentCallSuccess,
    fetchCommentCallFailed,
    deletePostStarted,
    deletePostSuccess,
    deletePostFailed,
    deleteCommentStarted,
    deleteCommentSuccess,
    deleteCommentFailed
}from './app.actions'

import fetch from 'isomorphic-fetch';

export const asyncActionFetchUserDetail = () => {
    return (dispatch) => { // this is store's dispatch method
        dispatch(apiCallStarted()); // call started
        fetch('http://localhost:3000/User',{
            credentials : 'include'
        }).then(response => response.json())
            .then(data => {
                console.log(data, "data");
                dispatch(apiCallSuccess(data));
            })
            .catch(err => {
                dispatch(apiCallFailed(err));		// failure
            });
    }
};

export const asyncActionPostBuzz = (postData) => {
 console.log('********post buzz async********',postData)
   return (dispatch) => { // this is store's dispatch method
            dispatch(postBuzzCallStarted()); // call started
            fetch('http://localhost:3000/Buzz', {
                credentials: 'include',
                method: 'post',
                body:postData,
            })
                .then(response => response.json())
                .then(data => {
                    dispatch(postBuzzCallSuccess(data)); 	// success
                })
                .catch(err => {
                    dispatch(postBuzzCallFailed(err));		// failure
                });
   }

}

export const asyncActionGetBuzz = () => {
    return (dispatch) => { // this is store's dispatch method
        dispatch(fetchPostCallStarted()); // call started
        fetch('http://localhost:3000/Buzz', {
            credentials: 'include',
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(fetchPostCallSuccess(data)); 	// success
            })
            .catch(err => {
                dispatch(fetchPostCallFailed(err));		// failure
            });
    }

}

export const asyncActionGetSpecificBuzz = (email) => {
    return (dispatch) => { // this is store's dispatch method
        dispatch(fetchPostCallStarted()); // call started
        fetch('http://localhost:3000/api/UserSpecificPost', {
            credentials: 'include',
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email)
        })
            .then(response => response.json())
            .then(data => {
                dispatch(fetchPostCallSuccess(data)); 	// success
            })
            .catch(err => {
                dispatch(fetchPostCallFailed(err));		// failure
            });
    }

}

export const asyncLikes = (userLikePost) => {
    return (dispatch) => {
       dispatch(likePostStarted());
       fetch('http://localhost:3000/api/likeDislike',{
           credentials: 'include',
           method: 'put',
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
           },
           body:JSON.stringify({userLikePost}) ,
       })
           .then(response => response.json())
           .then((data) => {
               console.log('>>>>>>>>>>>>>>>>>step 1................n');
               dispatch(likePostSuccess(data))
           })
           .catch(err => {
               dispatch(likePostFailed(err));
           })
   }
}

export const asyncComment = (commentPost) => {
    console.log(commentPost)
    return (dispatch) => {
        dispatch(commentStarted());
        fetch('http://localhost:3000/api/comment',{
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
        fetch('http://localhost:3000/api/getComments', {
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


export const asyncDeletePost = (postId) => {
    console.log("inside async action of delete",postId);
    return (dispatch) => {
        dispatch(deletePostStarted());
        fetch('http://localhost:3000/api/deletePost',{
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
                dispatch(deletePostSuccess(data));
               dispatch(deleteComment(postId))
            })
            .catch(err => {
                dispatch(deletePostFailed(err))
            })
    }
}

export const deleteComment = (postId) => {
    return (dispatch) => {
        dispatch(deleteCommentStarted());
        fetch('http://localhost:3000/api/deleteComment',{
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
}
