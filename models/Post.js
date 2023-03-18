const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        max: 500
    },
    img:{
        type: String
    },
    likes:{
        type: Array,
        default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post",PostSchema)