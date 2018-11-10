const express = require('express');
// const debug = require('debug')('index');
const app = express();
const api = require('./api/api');
const err = require('./middlware/err');

// setup the app middlware
require('./middlware/appMiddlware')(app);

// setup the api router
app.use('/api', api);

// Error middleware - Setup global error handling
app.use(err);

module.exports = app;