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

module.exports.getPostsPaginated = function(pageNumber, pageSize, callback) {
    const query = Post.find().sort('-createdAt').skip((pageNumber - 1) * pageSize).limit(pageSize);
    query.exec(callback);
}

module.exports.getTotalPostsCount = function(callback) {
    Post.countDocuments(callback);
}

module.exports.getPostByPosterId = function(id, callback) {
    const query = {id};
    Post.findOne(query, callback);
}

module.exports.addPost = function(newPost, callback) {
    newPost.save(callback);
}