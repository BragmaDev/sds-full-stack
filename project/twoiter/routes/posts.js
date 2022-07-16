const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
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
    // all posts
    if (req.query.pageNumber == undefined || req.query.pageSize == undefined) {
        Post.getAllPosts((err, posts) => {
            if (err) {
                res.json({success: false, msg: 'Failed to get posts'});
            } else {
                res.json({success: true, posts});
            }
        });
    } else {
        // paginated
        Post.getPostsPaginated(req.query.pageNumber, req.query.pageSize, (err, posts) => {
            if (err) {
                res.json({success: false, msg: 'Failed to get posts'});
            } else {
                res.json({success: true, posts});
            }
        });
    }  
});

// get total posts count
router.get('/getcount', (req, res, next) => {
    Post.getTotalPostsCount((err, count) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get posts count'});
        } else {
            res.json({success: true, count});
        }
    });
});

// delete post, requires that user is logged in and is the poster
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let foundPost;
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            res.json({succcess: false, msg: 'Could not find post'});
        } else {
            foundPost = post;
            if (req.user._id == foundPost.posterId) {
                post.remove((err) => {
                    if (err) {
                        res.json({success: false, msg: 'Failed to delete post'});
                    } else {
                        res.json({success: true, msg: 'Post deleted'});
                    }
                });
            } else {
                res.json({success: false, msg: 'You can only delete your own posts'});
            }
        }        
    });   
});

module.exports = router;