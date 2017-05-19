import React,{Component} from 'react'
import get from 'lodash/get';

import like from '../../../assets/images/like.png'
import dislike from '../../../assets/images/dislike.png'
import '../../../assets/styling/RecentBuzz.css'
import { asyncActionGetBuzz,asyncLikes,asyncGetComment,asyncDeletePost } from '../../../actions'
import Comment from './Comment'

export default class Activity extends Component{
    constructor(props) {
        super(props);
        this.state = {
            comment: '',

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
        let startIndex = 0;

        const recent_buzz = this.props.ReduxProps.postFetch.buzz;
        const commentsState = get(this.props.ReduxProps.commentReducer,'commentPost');
        const email = get(this.props.ReduxProps.userFetch, 'users.email');
        const image = get(this.props.ReduxProps.userFetch, 'users.imageURL');
        return(
            <div className="recentActivity">
                <p className="caption">Recent Buzz</p>
                { recent_buzz.slice(0).reverse().map((items)=>(
                    items.category === 'Activity' ?
                        <div key={index++} className="recent-buzz-body">
                            <div className="posts">
                                <img className="user_imageurl" src={items.user_imageURL}/>
                                <span className="user_email">{items.user_email}</span>

                                <div className="category">{items.category}</div>
                                { email === items.user_email ?
                                    <div>
                                        <button className="delete" onClick={()=> this.deletePost(items._id)}>Delete</button>
                                    </div> :
                                    <div></div>
                                }
                                { items.imageUpload ?
                                    <img src={"http://localhost:3000/files/"+items.imageUpload} className="posted-image"/>:
                                    <div></div>
                                }

                                <p>
                                    { items.content }
                                </p>
                                <div className="recentBuzz-footer">
                                    <span className="likecount">{items.likes.length}</span>
                                    <button className="like-dislike" onClick={this.likeDislike.bind(this,email,items._id,'like')}><img src={like}/></button>
                                    <span className="dislikecount">{items.dislike.length}</span>
                                    <button className="like-dislike" onClick={this.likeDislike.bind(this,email,items._id,'dislike')}><img src={dislike}/></button>
                                    <div >
                                        {commentsState ?
                                            <div>
                                                {commentsState.map((comment_item) => {
                                                    if (items._id === comment_item.postId) {
                                                        return <div key={index++} className="comments">
                                                            <img src={comment_item.user_Profile}/>
                                                            <span>{comment_item.userEmail}</span>
                                                            <div>{comment_item.content}</div>
                                                        </div>
                                                    }
                                                })}
                                            </div> :
                                            <div></div>
                                        }
                                    </div>
                                    <Comment ReduxState={this.props.ReduxProps} email={email} userImage={image} buzzID = {items._id}/>
                                </div>
                            </div>
                        </div>:
                        <div></div>
                ))}
            </div>
        )
    }
}