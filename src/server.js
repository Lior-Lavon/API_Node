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
const lionRouter = require('./routers/lionsRouter')();
const tigerRouter = require('./routers/tigerRouter')();

// app.set('views', './src/views');
app.use(morgan('dev')); // [combined | tiny | dev]
// Middleware - get the body and append to the req.body flag
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// middleware to print the body
app.use((req, res, next) => {
  debug(`Body: ${JSON.stringify(req.body)}`)
  next();
});

app.use('/lions', lionRouter);
app.use('/tigers', tigerRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './src/views', '/index.html'));
});

//Error middleware, the last in the stuck chain
app.use((err, req, res, next) => {
  if(err)
    debug(err.message);
    res.status(500).send(err);
});

// app.listen(port, () => {
//   debug(`Express: Listsning on port ${chalk.green(port)}`);
// });

module.exports = app;