const Author = require('../api/author/author');
const { signToken } = require('./auth')();

exports.signin = (req, res, next) => {
  // req.user will be there from the middleware verifyUser.
  // Then we can just create a token
  // and send it back for the client to consume
  const token = signToken(req.user._id);
  res.json({ token }); // short hand for { token: token }
};
