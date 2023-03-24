const router = require("express").Router();
const Post = require('../models/Post')
// Create a post
router.post("/",async (req,res)=>{
    const newPost = await new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})
// update a post
router.patch("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("Your post has been updated")
        }else{
            res.status(403).json("You can update only your post!")
        }
    }catch(err){
        res.status(500).json(err);
    }
});
// delete a post
router.delete("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("Your post has been deleted")
        }else{
            res.status(403).json("You can delete only your post!")
        }
    }catch(err){
        res.status(500).json(err);
    }
});

// like a post
router.put("/:id/like", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
           await post.updateOne({$push:{likes: req.body.userId}});
           res.status(200).json("Post has been liked")
        }else{
            await post.updateOne({$pull:{likes: req.body.userId}});
            res.status(200).json("Post has been disliked")
        }
    }catch(err){
        res.status(500).json(err);
    }
});

// unlike a post
router.put("/:id/unlike", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
           await post.updateOne({$pull:{likes: req.body.userId}});
           res.status(200).json("Post has been unliked")
        }else{
            await post.updateOne({$pull:{likes: req.body.userId}});
            res.status(200).json("Post has been disliked")
        }
    }catch(err){
        res.status(500).json(err);
    }
});

// is liked a post
router.post('/:id/isliked', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.likes.includes(req.body.userId)){
            res.status(200).json(true)
        }else{
            res.status(200).json(false)
        }
    }catch(err){
        res.status(500).json(err);
    }
})

// get a post
router.get("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);        
    }catch(err){
        res.status(500).json(err);
    }
});
// get timeline posts
router.get("/timeline/all", async (req,res)=>{
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
               return Post.find({ userId : friendPosts})
            })
        );
        res.json(userPosts.concat(...friendPosts))
        res.status(200).json(post);        
    }catch(err){
        res.status(500).json(err);
    }
});
// get all posts
router.get('/', async (req,res)=>{
    try{
        const post = await Post.find({});
        res.status(200).json(post);        
    }catch(err){
        res.status(500).json(err);
    }
});








module.exports = router