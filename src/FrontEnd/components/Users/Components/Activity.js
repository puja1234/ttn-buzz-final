import React,{Component} from 'react'
import get from 'lodash/get';

import '../../../assets/styling/RecentBuzz.css'
import Comment from './Comment'

export default class Activity extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }
    render(){
        let index =0;
        console.log("ACTIVITYYYYY",this.props);
        const recent_buzz = this.props.ReduxProps.postFetch.buzz;
        console.log("ACTIVITYYYYYYYY buzz",recent_buzz);
        const commentsState = get(this.props.ReduxProps.commentReducer,'commentPost in ACTIVITYYYYYYYY');
        console.log("content in comments in ACTIVITYYYYYYYYYYY is....................",commentsState);

        return(
            <div className="recentBuzz my-container">ACTIVITES
                { recent_buzz.map((items) => (
                        items.category === 'Activity' ?
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