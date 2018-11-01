// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data

const express = require('express');
const debug = require('debug')('server');
const chalk = require('chalk');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// app.set('views', './src/views');
app.use(morgan('tiny')); // [combined | tiny]
// Middleware - get the body and append to the req.body flag
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const lion1 = {
//   name: 'Simba1',
//   id: 1,
//   age: 2,
//   pride: 'the cool cats1',
//   gender: 'male1',
// };
// const lion2 = {
//   name: 'Simba2',
//   id: 2,
//   age: 4,
//   pride: 'the cool cats2',
//   gender: 'male2',
// };

let lions = [];
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './src/views', '/index.html'));
});

app.get('/lions', (req, res) => {
  res.json(lions);
});

app.get('/lions/:id', (req, res) => {
  const { id } = req.params;
  const objFound = lions.find(obj => obj.id == id);
  res.json(objFound);
});

app.post('/lions', (req, res) => {
  const obj = req.body;
  lions.push(obj);
  res.json(lions);
});

app.put('/lions/:id', (req, res) => {
  const { id } = req.params;
  const objNew = req.body;
  lions.map(obj => {
    if(obj.id == id){
      obj.name = objNew.name;
      obj.age = objNew.age;
      obj.pride = objNew.pride;
      obj.gender = objNew.gender;
    }
  });
  res.json(lions);
});

app.delete('/lions/:id', (req, res) => {
  const { id } = req.params;
  lions = lions.filter(obj => {
      return obj.id != id
  });
  res.json(lions); 
});

// app.get('/data', (req, res) => {
//   res.json(jsonData);
// });

app.listen(port, () => {
  debug(`Express: Listsning on port ${chalk.green(port)}`);
});
