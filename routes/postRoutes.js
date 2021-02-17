const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// get all posts
router.get('/', async (req, res) => {
    
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({message: error});
    }

})

// get specific post
router.get('/:postId', async (req, res) => {
    
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send({message: error});
    }

})

router.post('/', async (req, res) => {

    const post = new Post({
        title: req.body.title
    });

    const savedPost = await post.save();
    try {
        res.status(200).send(savedPost);
    } catch (error) {
        res.status(400).send({message: error});
    }

})

// delete post
router.delete('/:postId', async (req, res) => {
    
    try {
        const post = await Post.deleteOne({_id: req.params.postId});
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send({message: error});
    }

})

// update post
router.patch('/:postId', async (req, res) => {
    
    try {
        const post = await Post.updateOne({_id: req.params.postId}, { $set: {
            title: req.body.title
        }});
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send({message: error});
    }

})

module.exports = router;