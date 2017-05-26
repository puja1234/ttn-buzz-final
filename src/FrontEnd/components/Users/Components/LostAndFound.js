import React,{Component} from 'react'
import get from 'lodash/get';

import like from '../../../assets/images/like.png'
import dislike from '../../../assets/images/dislike.png'
import '../../../assets/styling/RecentBuzz.css'
import { asyncActionGetBuzz,asyncLikes,asyncGetComment,asyncDeletePost } from '../../../actions'
import Comment from './Comment'

export default class LostAndFound extends Component{
    constructor(props) {
        super(props);
        this.state = {


        }
    }

    componentWillMount(){
        this.props.ReduxProps.dispatch(asyncActionGetBuzz());
        this.props.ReduxProps.dispatch(asyncGetComment());

    }
    likeDislike = (email,postID,category) => {
        let userLikePost = {
            user_email: email,
            postID: postID,
            choice: category
        }
        this.props.ReduxProps.dispatch(asyncLikes(userLikePost));
    };


    deletePost = (postId) => {
        this.props.ReduxProps.dispatch(asyncDeletePost(postId));
        this.props.ReduxProps.dispatch(asyncActionGetBuzz());
    };

    render(){
        let index = 0;

        const recent_buzz = this.props.ReduxProps.postFetch.buzz;
        const commentsState = get(this.props.ReduxProps.commentReducer,'commentPost');

        return(
            <div className="recentBuzz my-container">LOST AND FOUND
                { recent_buzz.map((items) => (
                        items.category === 'Lost and Found' ?
                            <div key={index++} className="recent-buzz-body">
                                <div className="posts">
                                    <span>{Date(items.created_at)}</span>
                                    <img className="user_imageurl" src={items.user_imageURL}/>
                                    <span className="user_email">{items.user_email}</span>
                                    <div className="category">{items.category}</div>

                                    <p>
                                        { items.content }
                                    </p>
                                    <div className="recentBuzz-footer">
                                        <div className="btnlikes">
                                            <div className="dropdown">
                                                <button className="like-dislike-btn">{items.likes.length}</button>
                                                <div className="dropdown-content">
                                                    {items.likes.length ?
                                                        items.likes.map((likeUsers) => (
                                                            <a key={index++}>{likeUsers}</a>
                                                        )) :
                                                        <div></div>
                                                    }
                                                </div>
                                            </div>

                                            <div className="dropdown">
                                                <button className="like-dislike-btn">{items.dislike.length}</button>
                                                <div className="dropdown-content">
                                                    {items.dislike.length ?
                                                        items.dislike.map((likeUsers) => (
                                                            <a key={index++}>{likeUsers}</a>
                                                        )) :
                                                        <div></div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div></div>
                    )
                )
                }
            </div>
        )
    }
}