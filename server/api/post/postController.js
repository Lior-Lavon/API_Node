const _ = require('lodash');

const Post = require('./postModel');

const postController = () => {

  const params = (req, res, next, id) => {
    // use the id to read the post doc & attach to req
    Post.findById(id)
      .populate('author categories')
      .exec() // must be called here becouse populate does not return a promiss
      .then((post) => {
        if (!post) {
          next(new Error('No post with that id'));
        } else {
          req.post = post;
          next();
        }
      },
      (err) => {
        next(err);
      });
  };

  const get = (req, res, next) => {
    Post.find({})
      .populate('author categories')
      .exec() // must be called here becouse populate does not return a promiss
      .then((post) => {
        res.json(post);
      },
      (err) => {
        next(err);
      });
  };

  const getOne = (req, res, next) => {
    res.json(req.post);
  };

  const put = (req, res, next) => {
    let currentPost = req.post;
    const update = req.body;
    currentPost = _.merge(currentPost, update);

    Post.update(currentPost)
      .then((post) => {
        res.json(post);
      },
      (err) => {
        next(new Error(err));
      });
  };

  const post = (req, res, next) => {
    const newPost = req.body;
    Post.create(newPost)
      .then((post) => {
        res.json(post);
      },
      (err) => {
        next(new Error(err));
      });
  };

  const deletePost = (req, res, next) => {
    req.post.remove((err, removedDoc) => {
      if (err) {
        next(new Error(err));
      }
      res.json(removedDoc);
    });
  };

  return {
    params,
    get,
    getOne,
    put,
    post,
    deletePost,
  };
};

module.exports = postController;
