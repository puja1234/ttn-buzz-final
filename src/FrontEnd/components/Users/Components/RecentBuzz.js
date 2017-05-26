import React,{Component} from 'react'
import get from 'lodash/get';
import { connect } from 'react-redux';

import like from '../../../assets/images/like.png'
import dislike from '../../../assets/images/dislike.png'
import '../../../assets/styling/RecentBuzz.css'
import { asyncActionGetBuzz,asyncLikes,asyncGetComment,asyncDeletePost,asyncGetTotalBuzz } from '../../../actions'
import Comment from './Comment'
import more from '../../../assets/images/more.png'

export default class RecentBuzz extends Component{
    constructor(props){
        super(props);
        this.state={
            comment:'',

        }
    }
    checkifLast = () => {
        return (document.body.scrollHeight - 20 < (document.body.scrollTop + window.innerHeight));
    };
    onWindowScroll = () => {
        let res = this.checkifLast();
        if (res) {
            // const offset = this.props.ReduxProps.postFetch.offset;
            // console.log("offset is:", offset);
            this.props.ReduxProps.dispatch(asyncActionGetBuzz());
        }
    };

    componentWillMount(){
        // const offset = this.props.ReduxProps.postFetch.offset;
        // console.log("offset is:",offset);
        this.props.ReduxProps.dispatch(asyncActionGetBuzz());
        // this.props.fetchBuzz();
        this.props.ReduxProps.dispatch(asyncGetComment());
       window.addEventListener('scroll', this.onWindowScroll);
       // this.props.ReduxProps.dispatch(asyncGetTotalBuzz());
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onWindowScroll);
    }

    likeDislike = (email,postID,category) => {
        let userLikePost = {
                user_email: email,
                postID: postID,
                choice: category
            };
        this.props.ReduxProps.dispatch(asyncLikes(userLikePost));

        // console.log("category and email is :", category, email)
        // let userLikePost = {
        //     user_email: email,
        //     postID: postID,
        //     choice: category
        // }
        // let buzzArray = this.props.ReduxProps.postFetch.buzz;
        // console.log("buzz array is ", buzzArray)
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
    };

    // show_more_buzz = () => {
    //     const offset = this.props.ReduxProps.postFetch.offset;
    //     console.log("offset is:",offset);
    //     this.props.ReduxProps.dispatch(asyncActionGetBuzz(offset,2));
    // };

    deletePost = (postId) => {
        this.props.ReduxProps.dispatch(asyncDeletePost(postId));
       // this.props.ReduxProps.dispatch(asyncActionGetBuzz());
    };

    render(){
        let index = 0;
        const recent_buzz = this.props.ReduxProps.postFetch.buzz;
        console.log("props in recentbuzz",this.props.ReduxProps);
        console.log("totl buzz received :",recent_buzz);
        const commentsState = get(this.props.ReduxProps.commentReducer,'commentPost');
        console.log("content in comments in is....................",commentsState);
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
                            { items.imageUpload ?
                                <img src={"http://localhost:3000/files/"+items.imageUpload} className="posted-image"/>:
                                <div></div>
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
              {/*<img src={more} onClick={()=> this.show_more_buzz()} className="more" />*/}
            </div>
        )
    }
}

/*const mapStateToProps = (state) => ({
    buzz: state.buzz,
});

const mapDispatchToProps = (dispatch) => ({
    fetchBuzz: () => dispatch(asyncActionGetBuzz()),
});
const RecentBuzzContainer=connect(mapStateToProps,mapDispatchToProps)(RecentBuzz);
export default RecentBuzzContainer*/

