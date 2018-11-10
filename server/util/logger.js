const chalk = require('chalk');
const lodash = require('lodash');
const debug = require('debug')('index:logger');
const config = require('../config/config');

// create a noop function 
const noop = () => {};

// check if logging is enabled in the config
// if it is, then user consule.log 
// if not then noop 
const consoleLog = config.logging ? debug.bind(console) : noop;

var logger = {
    log: (variable) => {
//         var args = lodash.toArray(variable)
//             .map((arg) => {
//                 if(typeof arg === 'object') {
//                     var string = JSON.stringify(arg, 2);
//                     return string;
//                 } else {
// //                    arg+='';
//                     return arg;
//                 }
//             });
         consoleLog.apply(console, variable);
    }
};

module.exports = logger;