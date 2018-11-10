var lodash = require('lodash');

var config = {
    dev: 'development',
    test: 'testing',
    prod: 'production',
    port: process.env.port || 3000
};

// check to see if the NODE_ENV was set, if not, set the it to dev
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

// set config.env to whatever the NODE_ENV is
config.env = process.env.NODE_ENV;

// envConfig should be an object with logging property
var envConfig = require(`./${config.dev}`);

// merge envConfig -> config
module.exports = lodash.merge(config, envConfig);