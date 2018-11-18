const lodash = require('lodash');

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.port || 3000,

  // JWT expire time
  // 10 days in minutes
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.jwt || 'bumball',
  },
};

// check to see if the NODE_ENV was set, if not, set the it to dev
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

// set config.env to whatever the NODE_ENV is
config.env = process.env.NODE_ENV;

// envConfig should be an object with logging property
var envConfig = require(`./${config.dev}`);

// merge envConfig -> config
module.exports = lodash.merge(config, envConfig);