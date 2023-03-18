const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema({
    members:{
        type: Array,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friend",FriendSchema)