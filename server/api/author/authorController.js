const _ = require('lodash');

const Author = require('./authorModel');

const authorController = () => {

  const params = (req, res, next, id) => {
    // use the id to read the author doc & attach to req
    Author.findById(id)
      .then((author) => {
        if (!author) {
          next(new Error('No author with that id'));
        } else {
          req.author = author;
          next();
        }
      },
      (err) => {
        next(err);
      });
  };

  const get = (req, res, next) => {
    Author.find()
      .then((author) => {
        res.json(author);
      },
      (err) => {
        next(err);
      });
  };

  const getOne = (req, res, next) => {
    res.json(req.author);
  };

  const put = (req, res, next) => {
    let currentAuthor = req.author;
    const update = req.body;
    currentAuthor = _.merge(currentAuthor, update);

    Author.update(currentAuthor)
      .then((author) => {
        res.json(author);
      },
      (err) => {
        next(new Error(err));
      });
  };

  const post = (req, res, next) => {
    const newAuthor = req.body;
    Author.create(newAuthor)
      .then((author) => {
        res.json(author);
      },
      (err) => {
        next(new Error(err));
      });
  };

  const deleteAuthor = (req, res, next) => {
    req.author.remove((err, removedDoc) => {
      if (err) {
        next(new Error(err));
      }
      res.json(removedDoc);
    });
  };

  return {
    params,
    get,
    getOne,
    put,
    post,
    deleteAuthor,
  };
};

module.exports = authorController;
