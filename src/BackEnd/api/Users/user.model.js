let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name: {
        type:String
    },
    email: {
        type: String,
        lowercase: true
    },
    imageURL:{
        type:String
    } ,
    googleId:{
        type:String
    },
    role: {
        type:String,
        default:'user'
    },
    created_at: {
        type: Number,
        default: Date.now
    },
    updated_at: {
        type: Number,
        default: Date.now
    }
},

    { versionKey:false,

    }
);

module.exports = mongoose.model('User',UserSchema);