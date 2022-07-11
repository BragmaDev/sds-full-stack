const mongoose = require('mongoose');

// post schema
const PostSchema = mongoose.Schema({
    posterId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.getAllPosts = function(callback) {
    Post.find({}, callback);
}

module.exports.getPostByPosterId = function(id, callback) {
    const query = {id};
    Post.findOne(query, callback);
}

module.exports.addPost = function(newPost, callback) {
    newPost.save(callback);
}