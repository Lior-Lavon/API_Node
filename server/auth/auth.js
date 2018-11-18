const jwt = require('jsonwebtoken'); // used to sign and verify ower JsonWebTokens
const expressJwt = require('express-jwt'); // wrapper arround JWT for express

const config = require('../config/config');
const Author = require('../api/author/authorModel');

const checkToken = expressJwt({ secret: config.secrets.jwt });


const auth = () => {
  // middleware to check the incoming request token
  const decodeToken = (req, res, next) => {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 0345667' format
    // so checkToken can see it and decode it
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.header.authorization = `Bearer ${req.query.access_token}`;
    }

    // this will call next if token is valid
    // and send error if it is not. it will attached
    // the decoded token to req.user
    checkToken(req, res, next);
  };

  const getFreshUser = (req, res, next) => {
    // we will have access to the req.user here
    // becouse we will use decodeToken in before
    // this function in the middleware stack.
    // req.user will just be an object with the user
    // id on it. We want the full user object.

    /* eslint no-underscore-dangle: 0 */
    Author.findById(req.user._id)
      .then((user) => {
        if (!user) {
          // If no user is found it
          // was a valid JWT but didnt decode
          // to a real user in our DB. Either the user was deleted
          // since the client got the JWT, or
          // it was a JWT from some other source

          res.status(401).send('Unauthorized');
        } else {
          // update req.user with a fresh user from the
          // stake token data
          req.user = user;
          next();
        }
      },
      (err) => {
        next(err);
      });
  };

  // check if the user exist in the db
  // and the password + hashed is the same
  // password as created and hased originaly
  // and attache the result to re.query
  const verifyUser = (req, res, next) => {
    const { username, password } = req.body;

    // if no username or password then stop.
    if (!username || !password) {
      res.status(400).send('You need a username and password'); // bad request
      return;
    }

    // look user up in the DB so we can check
    // if the password match the username
    Author.findOne({ username }) // { username: username }
      .then((user) => {
        if (!user) {
          res.status(401).send('No user with the given username');
          return;
        }

        // checking the passwords here
        if (!user.authenticate(password, user.password)) {
          res.status(401).send('Wrong password');
        } else {
          // if everything is good.
          // then attach to req.user
          // and call next so the controller
          // can sign a token from the req.user._id
          req.user = user;
          next();
        }
      })
      .catch((err) => {
        next(new Error(err));
      });
    // use the authenticate() method on the user doc. Passin
    // in the posted password, it will hash the
    // password the same was as the current password got hashed
  };

  // util method to sign tokens on signup
  const signToken = (id) => {
    const sign = jwt.sign(
      {
        _id: id,
        expiresInMinutes: config.expireTime,
      },
      config.secrets.jwt,
    );
    return sign;
  };

  return {
    decodeToken,
    getFreshUser,
    verifyUser,
    signToken,
  };
};

module.exports = auth;
