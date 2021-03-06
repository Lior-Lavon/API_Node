const express = require('express');
// const logger = require('../../util/logger');
const categoryController = require('./categoryController')();

const router = express.Router();

module.exports = () => {
  const { params, get, getOne, put, post, deleteCat } = categoryController;

  router.param('id', params);
  router.route('/')
    .get(get)
    .post(post);
  router.route('/:id')
    .get(getOne)
    .put(put)
    .delete(deleteCat);
  return router;
};
