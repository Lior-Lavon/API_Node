const debug = require('debug')('index');
const chalk = require('chalk');

const app = require('./src/server');

const port = process.env.PORT || 4000;

app.listen(port, () => {
    debug(`Express: Listsning on port ${chalk.green(port)}`);
  });
  