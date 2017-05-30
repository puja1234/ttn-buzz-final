const Comment = require('./comments.model');

//create comment
exports.create = (commentData,res) => {
    Comment.create(commentData,(err,data) => {
        if(err)
            res.send("error occured in creating post");
        else
            res.send(data);
    })
};

//getting comments
exports.getComments = (res) => {
    Comment.find({},(err,data)=>{
        if(err)
            res.send(err);
        else
            res.send(data);
    })
};

//delete comments
exports.deleteComment = (id,res) => {
    Comment.remove({postId:id} , (err,data) => {
        if(err)
            res.send(err);
        else{
            Comment.find({}, (err,data) => {
                if(err)
                    res.send(err)
                else
                    res.send(data)
            })
        }
    })
};

