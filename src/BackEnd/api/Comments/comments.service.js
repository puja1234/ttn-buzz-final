var Comment = require('./comments.model');

exports.create = (commentData,res) => {
    Comment.create(commentData,(err,data) => {
        if(err){
            res.send("error occured in creating post");
        }

        if(data){
            res.send(data);
        }
    })

};

exports.getComments = (res) => {
    Comment.find({},(err,data)=>{
        if(err)
            res.send(err);
        else
            res.send(data);
    })
};

exports.deleteComment = (id,res) => {
    Comment.remove({postId:id} , (err,data) => {
        if(err)
            res.send(err)
        else{
            Comment.find({}, (err,data) => {
                if(err)
                    res.send(err)
                else
                    res.send(data)
            })

        }
    })
}