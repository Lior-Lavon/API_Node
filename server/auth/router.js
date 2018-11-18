const express = require('express');

const router = express.Router();
const controller = require('./controller');
const auth = require('./auth')();

const { verifyUser } = auth;
router.post('/signin', verifyUser, controller.signin);
module.exports = router;
