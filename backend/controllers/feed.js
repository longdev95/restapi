const { validationResult } = require("express-validator");
const Post = require('../model/post')

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{
      _id: 1,
      title: 'First Post',
      content: 'This is the first post!',
      creator: {
        name: 'Long Nguyen',
      },
      createdAt: new Date()
    }]
  });
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

