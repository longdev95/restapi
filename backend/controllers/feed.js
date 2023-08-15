const { validationResult } = require("express-validator");
const Post = require('../model/post')

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      res.status(200).json({ message: 'Fetch posts list successfully!', posts: posts })
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500
      next(err)
    })
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let error = new Error('Validation failed.')
    error.statusCode = 422
    throw error
  }

  const title = req.body.title;
  const content = req.body.content;

  // Create post in db
  const post = new Post({
    title: title,
    imageUrl: '/images',
    content: content,
    creator: { name: 'Long Nguyen' }
  })

  post
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully!',
        post: result
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
};

exports.getPost = (req, res, next) => {
  const postID = req.params.postID
  console.log(postID)
  Post.findById(postID)
    .then(post => {
      if (!post) {
        const err = new Error('Could not find the post.')
        err.statusCode = 404
        throw err  //we can throw err in .then here (asynchonous task) because we have .catch below to catch the throw error.
      }
      res.status(200).json({ message: 'Fetch post successfully!', post: post })
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err)
    })
}
