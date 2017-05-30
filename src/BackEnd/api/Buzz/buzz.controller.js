let PostService = require('./buzz.service');

//get list of posts
exports.getPost = (req,res,next) => {
    let offset = parseInt(req.param('offset'));
    PostService.getPosts(offset,2,res);
};

//get user specicfic post
exports.getSpecificPost = (req,res,next) => {
    email = req.body;
    PostService.getSpecificPosts(email,res);
};

//get post by category
exports.createPost =(req,res) => {
     let buzz = JSON.parse(req.body.buzzdata);
    console.log("req>>>>>>>>>>>>>>>>>>>", req.files);

    const buzzData =  {};
    buzzData.category= buzz.actionType;
    buzzData.content = buzz.buzz;
    buzzData.user_email = buzz.posted_by;
    buzzData.user_imageURL = buzz.posted_by_image;
    buzzData.imageUpload=[];
    for(let i=0;i<req.files.length;i++) {
        buzzData.imageUpload[i] = req.files[i];
    }
    PostService.createPost(buzzData,res);
};

//delete post from db
exports.deletePost = (req,res,next) => {
    let id = req.body.postId;
    PostService.deletePost(id,res);
};

//update post specicif likes-dislikes
exports.updateLikes = (req,res,next) => {
    let likeData = req.body.userLikePost;
    let buzzId = likeData.postID;
    let userEmail = likeData.user_email;
    let category = likeData.choice;
    PostService.updateLikes(buzzId,userEmail,category,res);
};

exports.getTotal = (req,res,next) => {
    PostService.getTotal(res);
};

exports.getCategoryBuzz =(req,res,next) => {
    let category = req.param('category');
    console.log("in controller to get category buzzes",category);
    PostService.getCategoryBuzz(category,res);
};

