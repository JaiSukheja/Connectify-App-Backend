const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email:{
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    password:{
        type: String,
        require: true,
        min: 6,
    },
    fullname:{
        type: String,
        default:""
    },
    profilePicture:{
        type: String,
        default: "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"
    },
    coverPicture:{
        type: String,
        default: "https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg"
    },
    followers:{
        type: Array,
        default: []
    },
    followings:{
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    desc:{
        type: String,
        max: 50
    },
    city:{
        type: String,
        max: 50
    },
    from:{
        type: String,
        max: 50
    },
    relationship:{
        type: Number,
        enum: [1,2,3]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User",UserSchema)