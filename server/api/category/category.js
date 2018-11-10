const express = require('express');
const logger = require('../../util/logger');

const router = express.Router();

module.exports = () => {
    router.route('/')
        .get((req, res, next) => {
          //logger.log('Hi from category!');
          // return next(new Error('this is from err'));
          res.json({ok: true});
        });
    return router;
}
