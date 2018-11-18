const chalk = require('chalk');
const debug = require('debug')('index');
const config = require('./server/config/config');
const app = require('./server/server');

// logger is a wrapper arround consule.log
// const logger = require('./server/util/logger');

app.listen(config.port, () => {
  debug(`Listsning on http://localhost:${chalk.green(config.port)}`);
});
