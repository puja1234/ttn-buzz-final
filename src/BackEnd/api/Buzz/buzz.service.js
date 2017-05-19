let Post = require('./buzz.model')
exports.createPost = (postData,res) => {

    Post.create(postData,(err,data) => {
        if(err){
            res.send("error occured in creating post");
        }

        if(data){
            res.send(data);
        }
    })

}

exports.getPosts = (res) => {   //get all posts
    Post.find({},(err,data) => {
        if(err){
            res.send(err);
        }else{
            res.send(data)
        }

    })
}

exports.getSpecificPosts = (email,res) => {   //get all posts

    Post.find({"user_email":email},(err,data) => {
        if(err){
            res.send(err);
        }else{
            res.send(data)
        }
    })
}

exports.updateLikes = (buzzID,userEmail,category,res) => { //update likes for the post
       var post = Post.find({}).cursor();
            if(category==='like'){
               post.on('data', function (doc) {
                   if(doc._id == buzzID) {
                       var check = doc.dislike.filter((item) => {
                           return item == userEmail
                       })
                       if (check != null) {
                           Post.update({_id: buzzID}, {$pull: {dislike: userEmail}},{safe:true},(err,data)=>{
                               if(err)
                                   console.log(err)
                               else
                                   console.log("data after pull",data)
                           })
                       }

                       if(doc.likes.indexOf(userEmail)>=0){
                           Post.find({_id: buzzID}, (err, data) => {
                               res.send(data)
                           })

                       }else{
                           Post.update({_id: buzzID}, {$push: {likes: userEmail}}, (err, data) => {
                               if (err)
                                   res.send(err)
                               else
                                   Post.find({_id: buzzID}, (err, data) => {
                                       res.send(data)
                                   })
                           })

                       }

                   }
               })

            } else {
                console.log("inside dislike")
                post.on('data', function (doc) {
                    if(doc._id == buzzID) {
                        var check = doc.likes.filter((item) => {
                            return item == userEmail
                        })
                        if (check != null) {
                            console.log("there is data in like that is same")
                            Post.update({_id: buzzID}, {$pull: {likes: userEmail}},{safe:true},(err,data)=>{
                                if(err)
                                    console.log(err)
                                else
                                    console.log("data after pull",data)
                            })
                        }

                        if(doc.dislike.indexOf(userEmail)>=0){
                            Post.find({_id: buzzID}, (err, data) => {
                                res.send(data)
                            })

                        }else{
                            Post.update({_id: buzzID}, {$push: {dislike: userEmail}}, (err, data) => {
                                if (err)
                                    res.send(err)
                                else
                                    Post.find({_id: buzzID}, (err, data) => {
                                        res.send(data)
                                    })
                            })

                        }

                    }
                })
            }
}

exports.deletePost = (id,res) => {
    console.log("deleting post ")
    Post.remove({ _id: id}, (err,data)=> {
        if (err) {
           res.send(err);
        }
        else {
            Post.find({},(err,data)=>{
                if(err)
                    res.send(err);
                else
                    res.send(data)
            })

        }
    });
}


