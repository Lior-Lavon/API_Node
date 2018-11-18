const express = require('express');
// const logger = require('../../util/logger');
const postController = require('./postController')();

const router = express.Router();

module.exports = () => {
  const { params, get, getOne, put, post, deletePost } = postController;

  router.param('id', params);
  router.route('/')
    .get(get)
    .post(post);
  router.route('/:id')
    .get(getOne)
    .put(put)
    .delete(deletePost);
  return router;
};
