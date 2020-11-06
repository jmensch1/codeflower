
////////////// IMPORTS ///////////////

const config = require('@config');

////////////// PRIVATE ///////////////

function logger(logLevel) {
  // get all args except the first
  let args = Array.prototype.slice.call(arguments, 1);

  // log them if appropriate
  if (logLevel === 'error')
    console.error.apply(null, args);
  else if (logLevel <= config.logLevel)
    console.log.apply(null, args);
}

/////////////// PUBLIC ///////////////

module.exports = logger;

