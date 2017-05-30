import React,{Component} from 'react'
import get from 'lodash/get';

import '../../../assets/styling/RecentBuzz.css'
import {asyncGetBuzzCategory} from '../../../actions'
import NextImage from './NextImage'


export default class Activity extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.ReduxProps.dispatch(asyncGetBuzzCategory('Activity'));
    }


    render(){
        let index =0
        const commentsState = get(this.props.ReduxProps.commentReducer,'commentPost');
        const email = get(this.props.ReduxProps.userFetch, 'users.email');
        const image = get(this.props.ReduxProps.userFetch, 'users.imageURL');
        const recent_buzz = this.props.ReduxProps.postFetch.category;


        return(
            <div className="recentBuzz my-container">
                <p className="caption">Activities</p>
                { recent_buzz.map((items)=>(
                    <div key={index++} className="recent-buzz-body">
                        <div className="posts">
                            <span>{Date(items.created_at)}</span>
                            <img className="user_imageurl" src={items.user_imageURL}/>
                            <span className="user_email">{items.user_email}</span>
                            <div className="category">{items.category}</div>

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
                                    <img  className="like-dislike" src={`/${require('../../../assets/images/like.png')}`}/>
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
                                    <img src={`/${require('../../../assets/images/dislike.png')}`} className="like-dislike" />
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
                    </div>
                ))}
            </div>
        )
    }
}