import React,{Component} from 'react'
// import '../../assets/styling/RecentBuzz.css'
// import { asyncActionGetSpecificBuzz } from '../../actions'
// import {connect} from 'react-redux'
// import get from 'lodash/get';
//
// class Posts extends Component{
//     componentWillMount(){
//         const email = get(this.props, 'users.email');
//         this.props.dispatch(asyncActionGetSpecificBuzz(email));
//     }
//
//     render(){
//         return(
//             <div className="recentBuzz">
//                 <p className="caption">Recent Buzz</p>
//                 {recent_buzz.slice(0).reverse().map((items)=>(
//                     <div key={items._id} className="recent-buzz-body">
//                         <div className="posts">
//                             <img src={items.user_imageURL}/>
//                             <p>{items.user_email}</p>
//                             <div className="category">{items.category}</div>
//                             <img src={post1} className="posted-image"/>
//                             <p>
//                                 {items.content}
//                             </p>
//                             <div className="recentBuzz-footer">
//                                 <div className="like-dislike" ><img src={like}/></div>
//                                 <div className="like-dislike" ><img src={dislike}/></div>
//                                 <textarea placeholder="comment" className="comment"></textarea>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         )
//     }
// }
// const PostContainer=connect(state => state)(Posts)
// export default PostContainer;