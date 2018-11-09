const express = require('express');
const lodash = require('lodash');
const debug = require('debug')('app:tigerRouter');

const tigerRouter = express.Router();

// const tiger = {
//   name: 'Simba1',
//   id: 1,
//   age: 2,
//   pride: 'the cool cats1',
//   gender: 'male1',
// };

let tigers = [];
let id = 0;

// middleware to increment the id before the POST tiger
const updateId = (req, res, next) => {
  if (!req.body.id) {
    id++;
    req.body.id = id + ''; // add the id to the body with the tiger
  }
  next();
};

const router = () => {
    tigerRouter.route('/')
        .get((req, res) => {
          res.json(tigers);
        })
        .post(updateId, (req, res) => {
            const tiger = req.body;
            tigers.push(tiger);
            res.json(tigers);
        });
        tigerRouter.route('/:id')
        .get((req, res) => {
          res.json(req.tiger || {});
        })
        .put((req, res) => {
            const { id } = req.params;
            const update = req.body;
            if(update.id){
              delete update.id;
            }
          
            const index = lodash.findIndex(tigers, { id: id});
            if(!tigers[index]){
              res.status(500).send();
            } else {
              const updatedTiger = lodash.assign(tigers[index], update);
              res.json(updatedTiger);
            }
        })
        .delete((req, res) => {
            const { id } = req.params;
            const index = lodash.findIndex(tigers, { id: id});
            if(!tigers[index]){
                res.status(500).send();
            } else {
                const deleted = tigers[index];
                tigers.splice(index, 1);
                res.json(deleted);
            }
        });

    return tigerRouter;
}

module.exports = router;