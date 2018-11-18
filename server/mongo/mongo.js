const mongoose = require('mongoose');
const chalk = require('chalk');
const debug = require('debug')('index');

const config = require('../config/config');

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

// export this function and imported by server.js
const mongoConnect = () => {

  return new Promise((resolve, Reject) => {
    mongoose.connect(config.db.url, { useNewUrlParser: true });

    mongoose.connection.on('connected', () => {
      debug(connected('Mongoose default connection is open to ', config.db.url));
      resolve();
    });

    mongoose.connection.on('error', (err) => {
      debug(error(`Mongoose default connection has occured ${err} error`));
      Reject();
    });

    mongoose.connection.on('disconnected', () => {
      debug(disconnected('Mongoose default connection is disconnected'));
    });

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        debug(termination('Mongoose default connection is disconnected due to application termination'));
        process.exit(0);
      });
    });
  });
};

module.exports = mongoConnect;
