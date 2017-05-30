let Post = require('./buzz.model');

//create buzz
exports.createPost = (postData, res) => {
    Post.create(postData, (err, data) => {
        if (err)
            res.send("error occured in creating post");
        else
            res.send(data);
    })
};

//get all posts
exports.getPosts = (offset,limits,res) => {
    let q = Post.find({}).sort({created_at: -1}).skip(offset).limit(2);
    q.exec(function (err, data) {
        if (err)
            res.send(err);
       else
            res.send(data)
    });
};

//get user specific posts
exports.getSpecificPosts = (email, res) => {
    Post.find({"user_email": email}, (err, data) => {
        if (err)
            res.send(err);
         else
            res.send(data)
    })
};

//update likes for the post
exports.updateLikes = (buzzID, userEmail, category, res) => {
    let post = Post.find({}).cursor();
    if (category === 'like') {   //if user has liked the post
        post.on('data', function (doc) {
            if (doc._id == buzzID) {
               let check = doc.dislike.filter((item) => {   //check if that user has already disliked the post
                    return item == userEmail
                });
                if (check != null) {
                    Post.update({_id: buzzID}, {$pull: {dislike: userEmail}}, {safe: true}, (err, data) => { //pull that user from dislike array
                        if (err)
                            console.log(err);
                        else
                            console.log("data after pull", data)
                    })
                }

                if (doc.likes.indexOf(userEmail) >= 0) {
                    Post.find({_id: buzzID}, (err, data) => {
                        res.send(data)
                    })

                } else {
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

    } else {  //if user has disliked the post
        post.on('data', function (doc) {
            if (doc._id == buzzID) {
               let check = doc.likes.filter((item) => {  //check if user has already liked the post
                    return item == userEmail
                });
                if (check != null) {
                    Post.update({_id: buzzID}, {$pull: {likes: userEmail}}, {safe: true}, (err, data) => {  //pull user from like array
                        if (err)
                            console.log(err);
                        else
                            console.log("data after pull", data)
                    })
                }

                if (doc.dislike.indexOf(userEmail) >= 0) {
                    Post.find({_id: buzzID}, (err, data) => {
                        res.send(data)
                    })

                } else {
                    Post.update({_id: buzzID}, {$push: {dislike: userEmail}}, (err, data) => {
                        if (err)
                            res.send(err);
                        else
                            Post.find({_id: buzzID}, (err, data) => {
                                res.send(data)
                            })
                    })

                }

            }
        })
    }
};

//delete post
exports.deletePost = (id, res) => {
    Post.find({_id: id}, (err, data) => {
        if (err)
            res.send(err);
        else {
            Post.remove({_id: id}, (err, dataRemoved) => {
                if (err)
                    res.send(err);
                else{
                    res.send(data);
                }
            })
        }
    });
};

exports.getTotal = (res) => {
    Post.count({}, (err, counts) => {
        if (err)
            res.send(err);
        else
            res.send(counts);
    })
};

exports.getCategoryBuzz = (categories,res) => {
    Post.find({category:categories} , (err,data) => {
        if(err)
            res.send(err);
        else
            console.log("data from mongo with category",categories,"are : -------------",data);
            res.send(data)
    })
};


