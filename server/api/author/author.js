const express = require('express');
// const logger = require('../../util/logger');
const authorController = require('./authorController')();

const router = express.Router();

module.exports = () => {
  const { params, get, getOne, put, post, deleteAuthor } = authorController;

  router.param('id', params);
  router.route('/')
    .get(get)
    .post(post);
  router.route('/:id')
    .get(getOne)
    .put(put)
    .delete(deleteAuthor);
  return router;
};
