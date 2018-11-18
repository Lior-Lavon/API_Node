const express = require('express');
const debug = require('debug')('index:server');

const app = express();
const api = require('./api/api');
const err = require('./middlware/err');
const seeds = require('./mongo/seeds');
const config = require('./config/config');
const auth = require('./auth/router');

// setup the app middlware
require('./middlware/appMiddlware')(app);

// connect to Mongo
require('./mongo/mongo')()
  .then(() => {
    // clear the DB and seed it with data
    if (config.seeds) {
      seeds();
    }
  })
  .catch(() => {
    debug('Error Mongo connection');
  });


// setup the api router
app.use('/api', api);
app.use('/auth', auth);

// Error middleware - Setup global error handling
app.use(err);

module.exports = app;
