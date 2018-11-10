const express = require('express');
const logger = require('../../util/logger');

const router = express.Router();

module.exports = () => {
    router.route('/')
        .get((req, res) => {
          //logger.log('Hi from post!');
          res.json({ok: true});
        });
    return router;
}
