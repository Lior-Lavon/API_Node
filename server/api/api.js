const express = require('express');
const categoryRouter = require('./category/category')();
const postRouter = require('./post/post')();
const user = require('./author/author')();

const router = express.Router();

router.use('/categories', categoryRouter);
router.use('/posts', postRouter);
router.use('/author', user);

module.exports = router;
