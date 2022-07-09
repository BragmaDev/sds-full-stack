const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// create post
router.post('/create', (req, res, next) => {
    let newPost = new Post({
        posterId: req.body.posterId,
        content: req.body.content
    });

    Post.addPost(newPost, (err, post) => {
        if (err) {
            res.json({success: false, msg: 'Failed to create post'});
        } else {
            res.json({success: true, msg: 'Post created'});
        }
    })
});

module.exports = router;