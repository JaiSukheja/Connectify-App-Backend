const router = require("express").Router();
const Message = require('../models/Message')

// Add a message
router.post("/" , async (req,res)=>{
    const newMessage = new Message(req.body);
    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage)
    }catch(err){
        res.status(500).json(err);
    }
});

// get a message
router.get("/:friendId", async (req,res)=>{
    try{
        const messages = await Message.find({
            friendId: req.params.friendId,
        });
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router