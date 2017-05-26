var PostService = require('./buzz.service')



exports.getPost = (req,res,next) => { //get list of posts
    let offset = parseInt(req.param('offset'));
    console.log('wyeqwetrqywe',offset);
    //let limits = parseInt(req.param('limits'));

   console.log("getting all posts controller skip",offset);
 //  console.log("getting all posts controller limit",limits);
   PostService.getPosts(offset,2,res);

}
//get user specicfic post
exports.getSpecificPost = (req,res,next) => { //get list of posts
    console.log("getting specific posts");
    email = req.body;
    PostService.getSpecificPosts(email,res);
}
//get post by category


exports.createPost =(req,res) => { //create new post in db
    let buzz = JSON.parse(req.body.buzzdata);
   console.log("req>>>>>>>>>>>>>>>>>>>",buzz, req.file);

   const buzzData =  {}
   buzzData.category= buzz.actionType;
   buzzData.content = buzz.buzz;
   buzzData.user_email = buzz.posted_by;
   buzzData.user_imageURL = buzz.posted_by_image;
   if(req.file){
       buzzData.imageUpload = req.file.filename;
   }else{
       buzzData.imageUpload = ''
   }


    console.log("Creating post",buzzData);
    PostService.createPost(buzzData,res);
}
//update post in db

//delete post from db
exports.deletePost = (req,res,next) => {
    console.log("inside delete post with id",req.body);
    let id = req.body.postId;
    // console.log("inside delete post with id",id)
    PostService.deletePost(id,res);
}

exports.updateLikes = (req,res,next) => {  //update post specicif like
    let likeData = req.body.userLikePost;
    let buzzId = likeData.postID;
    let userEmail = likeData.user_email;
    let category = likeData.choice;
    PostService.updateLikes(buzzId,userEmail,category,res);
};

exports.getTotal = (req,res,next) => {
    console.log("getting total buzzes");
    PostService.getTotal(res);
}

