// const mongoose = require('mongoose');
const chalk = require('chalk');
const debug = require('debug')('index:seeds');
const Author = require('../api/author/authorModel');
const Posts = require('../api/post/postModel');
const Categor = require('../api/category/categoryModel');

const AddAuthor = () => {
  const author1 = {
    username: 'user1',
    password: 'password1',
  };
  Author.create(author1)
    .then(() => {
      // debug(data);
    })
    .catch((err) => {
      debug(err);
    });

  const author2 = {
    username: 'user2',
    password: 'password2',
  };
  Author.create(author2)
    .then(() => {
      // debug(data);
    })
    .catch((err) => {
      debug(err);
    });


  const author3 = {
    username: 'user3',
    password: 'password3',
  };
  Author.create(author3)
    .then(() => {
      // debug(data);
    })
    .catch((err) => {
      debug(err);
    });
};

const AddCategory = () => {
  const cat1 = {
    name: 'category1',
  };
  Categor.create(cat1);

  const cat2 = {
    name: 'category2',
  };
  Categor.create(cat2);

  const cat3 = {
    name: 'category3',
  };
  Categor.create(cat3);
};

const AddPosts = () => {
  Author.find()
    .then((author) => {
      if (author.length > 0) {
        const post1 = {
          title: 'post 1',
          text: 'This is the text for post 1',
          author: author[0].id,
        };
        Posts.create(post1);

        const post2 = {
          title: 'post 2',
          text: 'This is the text for post 2',
          author: author[1].id,
        };
        Posts.create(post2);

        const post3 = {
          title: 'post 3',
          text: 'This is the text for post 3',
          author: author[2].id,
        };
        Posts.create(post3);
      }
    });
};

const seedingDB = () => {
  Author.collection.deleteMany();
  Posts.collection.deleteMany();
  Categor.collection.deleteMany();

  debug(chalk.green('Database collection was dropped.'));

  setTimeout(() => {
    AddAuthor();
    AddCategory();

    setTimeout(() => {
      AddPosts();
      debug(chalk.green('DB Seed Finished !!'));
    }, 1000);
  }, 1000);
};


module.exports = seedingDB;
