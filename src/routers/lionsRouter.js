const express = require('express');
const lodash = require('lodash');
const debug = require('debug')('app:lionRouter');

const lionRouter = express.Router();

// const lion1 = {
//   name: 'Simba1',
//   id: 1,
//   age: 2,
//   pride: 'the cool cats1',
//   gender: 'male1',
// };

let lions = [];
let id = 0;

// middleware to increment the id before the POST lion
const updateId = (req, res, next) => {
  if (!req.body.id) {
    id++;
    req.body.id = id + ''; // add the id to the body with the lion
  }
  next();
};

// middleware for getting the id and the lion, before calling /lions/:id
lionRouter.param('id', (req, res, next, id) => {
    const lion = lodash.find(lions, { id: id});
    if(lion){
      req.lion = lion;
      next();
    } else {
      res.status(401).send();
    }
  });

const router = () => {
    lionRouter.route('/')
        .get((req, res) => {
          res.json(lions);
        })
        .post(updateId, (req, res) => {
            const lion = req.body;
            lions.push(lion);
            res.json(lion);
        });
    lionRouter.route('/:id')
        .get((req, res) => {
          res.json(req.lion || {});
        })
        .put((req, res) => {
            const { id } = req.params;
            const update = req.body;
            if(update.id){
              delete update.id;
            }
          
            const index = lodash.findIndex(lions, { id: id});
            if(!lions[index]){
              res.status(500).send();
            } else {
              const updatedLion = lodash.assign(lions[index], update);
              res.json(updatedLion);
            }
        })
        .delete((req, res) => {
            const { id } = req.params;
            const index = lodash.findIndex(lions, { id: id});
            if(!lions[index]){
                res.status(500).send();
            } else {
                const deleted = lions[index];
                lions.splice(index, 1);
                res.json(deleted);
            }
        });

    return lionRouter;
}

module.exports = router;