const router = require("express").Router();
const Friend = require('../models/Friend')

// New converation

router.post('/', async (req,res)=>{
    const newConverstion = new Friend({
        members:[req.body.senderId, req.body.receiverId],
    });
    try{
        const savedfriend = await newConverstion.save();
        res.status(200).json(savedfriend);
    }catch(err){
        res.status(500).json(err)
    }
})

// Get friend of user
router.get('/:userId', async (req,res)=>{
    try{
        const friend = await Friend.find({
            members: {$in: [req.params.userId] },
        });
        res.status(200).json(friend)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router
