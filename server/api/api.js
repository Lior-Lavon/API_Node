const express = require('express');
const categoryRouter = require('./category/category')();
const postRouter = require('./post/post')();
const user = require('./user/user')();

const router = express.Router();

router.use('/categories', categoryRouter);
router.use('/posts', postRouter);
router.use('/users', user);

module.exports = router;