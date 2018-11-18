const debug = require('debug')('index:err');

module.exports = (err, req, res, next) => {
  if (err) {
    debug(err.message);
    res.status(500).send(err);
  }
};
