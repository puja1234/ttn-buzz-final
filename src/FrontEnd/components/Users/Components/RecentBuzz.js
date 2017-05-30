import React,{Component} from 'react'
import get from 'lodash/get';

import like from '../../../assets/images/like.png'
import dislike from '../../../assets/images/dislike.png'
import '../../../assets/styling/RecentBuzz.css'
import { asyncActionGetBuzz,asyncLikes,asyncGetComment,asyncDeletePost,asyncGetTotalBuzz } from '../../../actions'
import Comment from './Comment'
import NextImage from './NextImage'

export default class RecentBuzz extends Component{
    constructor(props){
        super(props);
        this.state={
            comment:'',
            index:0
        }
    }
    checkifLast = () => {
        return (document.body.scrollHeight - 5 < (document.body.scrollTop + window.innerHeight));
    };
    onWindowScroll = () => {
        let res = this.checkifLast();
        if (res) {
            this.props.ReduxProps.dispatch(asyncActionGetBuzz());
        }
    };

    componentDidMount(){
        this.props.ReduxProps.dispatch(asyncActionGetBuzz());
        this.props.ReduxProps.dispatch(asyncGetComment());
        window.addEventListener('scroll', this.onWindowScroll);

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onWindowScroll);
    }

    likeDislike = (email,postID,category) => {
        const recent_buzz = this.props.ReduxProps.postFetch.buzz;
        let buzzMatch = recent_buzz.find(function (items) {
            return items._id === postID
        });
        if (category === 'like') {
            if (buzzMatch.likes.indexOf(email) >= 0)
                alert("You had already liked this post");
            else {
                let userLikePost = {
                    user_email: email,
                    postID: postID,
                    choice: category
                };
                this.props.ReduxProps.dispatch(asyncLikes(userLikePost));
            }
        } else {
            if (buzzMatch.dislike.indexOf(email)>=0)
                alert("You had already disliked this post");
            else {
                let userLikePost = {
                    user_email: email,
                    postID: postID,
                    choice: category
                };
                this.props.ReduxProps.dispatch(asyncLikes(userLikePost));
            }
        }
    }


        // let buzzMatches = find(buzzArray, function (post) {
        //     return post._id == postID
        // });//check if user has already liked
        // if (category === 'like') {
        //     console.log('inside like with object', buzzMatches)
        //     find(buzzMatches.likes, function (post) {
        //         console.log('index of like', buzzMatches.likes.indexOf(email));
        //         if (buzzMatches.likes.indexOf(email) < 0) {
        //             this.props.ReduxProps.dispatch(asyncLikes(userLikePost));
        //             return;
        //         }
        //         else
        //             return;
        //
        //     });
        // } else {
        //     console.log("inside dislike with object", buzzMatches)
        //     find(buzzMatches.dislike, function (post) { //check if user has already disliked
        //         console.log('index of dislike', buzzMatches.dislike.indexOf(email))
        //         if (buzzMatches.dislike.indexOf(email) < 0) {
        //             this.props.ReduxProps.dispatch(asyncLikes(userLikePost));
        //             return;
        //         }
        //         else
        //             return;
        //
        //     });
        // }


    deletePost = (postId) => {
        this.props.ReduxProps.dispatch(asyncDeletePost(postId));

    };

    render(){
        let index = 0;

        const recent_buzz = this.props.ReduxProps.postFetch.buzz;
        const commentsState = get(this.props.ReduxProps.commentReducer,'commentPost');
        const email = get(this.props.ReduxProps.userFetch, 'users.email');
        const image = get(this.props.ReduxProps.userFetch, 'users.imageURL');

        return(
            <div className="recentBuzz my-container">
                <p className="caption">Recent Buzz</p>
                { recent_buzz.map((items)=>(
                    <div key={index++} className="recent-buzz-body">
                        <div className="posts">
                            <span>{Date(items.created_at)}</span>
                            <img className="user_imageurl" src={items.user_imageURL}/>
                            <span className="user_email">{items.user_email}</span>
                            <div className="category">{items.category}</div>
                          { email === items.user_email ?
                                <div>
                                    <button className="delete" onClick={()=> this.deletePost(items._id)}>Delete</button>
                                </div> :
                                <div></div>
                            }

                            {items.imageUpload.length > 1 ?
                                <NextImage buzzImage={items}/>:
                                ( items.imageUpload ?
                                    (items.imageUpload.map((images) =>{
                                        return <img src={"http://localhost:3000/files/"+images.filename} className="posted-image"/>
                                    })) : ''
                                )

                            }


                            <p className="content">
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
                                                )):
                                                <div></div>
                                            }
                                        </div>
                                    </div>
                                    <img  className="like-dislike" src={`/${require('../../../assets/images/like.png')}`} onClick={this.likeDislike.bind(this,email,items._id,'like')}/>
                                    <div className="dropdown">
                                        <button className="like-dislike-btn">{items.dislike.length}</button>
                                        <div className="dropdown-content">
                                            {items.dislike.length ?
                                                items.dislike.map((likeUsers) => (
                                                    <a key={index++}>{likeUsers}</a>
                                                )):
                                                <div></div>
                                            }
                                        </div>
                                    </div>
                                    <img src={`/${require('../../../assets/images/dislike.png')}`} className="like-dislike" onClick={this.likeDislike.bind(this,email,items._id,'dislike')}/>
                                </div>
                            </div>
                        </div>
                                <div >
                                    <img className="comments-image" src={`/${require('../../../assets/images/comments.jpg')}`}/>
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
                ))}

            </div>
        )
    }
}


