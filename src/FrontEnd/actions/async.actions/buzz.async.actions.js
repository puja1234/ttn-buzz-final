import {
    postBuzzCallStarted,
    postBuzzCallSuccess,
    postBuzzCallFailed,
    fetchPostCallStarted,
    fetchPostCallSuccess,
    fetchPostCallFailed,
    likePostStarted,
    likePostSuccess,
    likePostFailed,
    deletePostStarted,
    deletePostSuccess,
    deletePostFailed,
    fetchCategoryBuzzCallSuccess
} from '../app.actions'
export const asyncActionPostBuzz = (postData) => {

    return (dispatch) => { // this is store's dispatch method
        dispatch(postBuzzCallStarted()); // call started
        fetch('http://localhost:3000/api/Buzz', {
            credentials: 'include',
            method: 'post',
            body:postData,
        })
            .then(response => response.json())
            .then(data => {
                dispatch(postBuzzCallSuccess(data));

                // success
            })
            .catch(err => {
                dispatch(postBuzzCallFailed(err));		// failure
            });
    }

};

export const asyncActionGetBuzz = () => (dispatch,getState) => {
    let store = getState();
    let offset = store.postFetch.offset;

    dispatch(fetchPostCallStarted()); // call started
    fetch(`http://localhost:3000/api/Buzz?offset=${offset}`, {
        credentials: 'include',
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            //console.log("data got from mongodb is:",data);
            dispatch(fetchPostCallSuccess(data)); 	// success
        })
        .catch(err => {
            dispatch(fetchPostCallFailed(err));		// failure
        });

};

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
        fetch('http://localhost:3000/api/Buzz',{
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
                // console.log('>>>>>>>>>>>>>>>>>step 1................n');
                dispatch(likePostSuccess(data))
            })
            .catch(err => {
                dispatch(likePostFailed(err));
            })
    }
};

export const asyncDeletePost = (postId) => {
    // console.log("inside async action of delete",postId);
    return (dispatch) => {
        dispatch(deletePostStarted());
        fetch('http://localhost:3000/api/Buzz',{
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
};

export const asyncGetBuzzCategory =(category) => {
    return (dispatch) => {
        dispatch(fetchPostCallStarted());
        fetch(`http://localhost:3000/api/BuzzCategory?category=${category}`, {
            credentials: 'include',
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(fetchCategoryBuzzCallSuccess(data)); 	// success
            })
            .catch(err => {
                dispatch(fetchPostCallFailed(err));		// failure
            });

    }
};