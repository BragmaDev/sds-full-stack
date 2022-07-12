const express = require('express');
const mongoose = require('mongoose');
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

// get posts
router.get('/get', (req, res, next) => {
    Post.getAllPosts((err, posts) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get posts'});
        } else {
            posts.sort((a, b) => {
                return b.createdAt - a.createdAt;
            });
            res.json({success: true, posts});
        }
    })
});

module.exports = router;