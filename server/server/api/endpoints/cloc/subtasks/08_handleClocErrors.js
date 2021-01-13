//////////// IMPORTS ////////////

const Log = require('@log')

//////////// PRIVATE ////////////

function handleClocErrors(err, params) {
  Log(2, '8. Handling Cloc Errors')

  // add info to the error
  err.params = params

  // pass it on to the main handler
  throw err
}

//////////// EXPORTS ////////////

module.exports = handleClocErrors
