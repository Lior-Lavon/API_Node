const debug = require('debug')('index:appMiddlware');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const appMiddlware = (app) => {
    app.use(morgan('dev')); // [combined | tiny | dev]
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // middleware to print the body
    app.use((req, res, next) => {
        debug(`Body: ${JSON.stringify(req.body)}`)
        next();
    });
};

module.exports = appMiddlware;
