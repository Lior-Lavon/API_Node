const _ = require('lodash');

const Category = require('./categoryModel');

const categoryController = () => {

  const params = (req, res, next, id) => {
    // use the id to read the category doc & attach to req
    Category.findById(id)
      .then((category) => {
        if (!category) {
          next(new Error('No category with that id'));
        } else {
          req.category = category;
          next();
        }
      },
      (err) => {
        next(err);
      });
  };

  const get = (req, res, next) => {
    Category.find()
      .then((category) => {
        res.json(category);
      },
      (err) => {
        next(err);
      });
  };

  const getOne = (req, res, next) => {
    res.json(req.category);
  };

  const put = (req, res, next) => {
    let currentCategory = req.category;
    const update = req.body;
    currentCategory = _.merge(currentCategory, update);

    Category.update(currentCategory)
      .then((category) => {
        res.json(category);
      },
      (err) => {
        next(new Error(err));
      });
  };

  const post = (req, res, next) => {
    const newCategory = req.body;
    Category.create(newCategory)
      .then((category) => {
        res.json(category);
      },
      (err) => {
        next(new Error(err));
      });
  };

  const deleteCat = (req, res, next) => {
    req.category.remove((err, removedDoc) => {
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
    deleteCat,
  };
};

module.exports = categoryController;
