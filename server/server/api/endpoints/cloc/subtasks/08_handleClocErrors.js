
//////////// IMPORTS ////////////

const Log = require('@log');

//////////// PRIVATE ////////////

function handleClocErrors(err, ctrl) {
  Log(2, '8. Handling Cloc Errors');

  // add info to the error
  err.params = ctrl.params;
  err.repo = ctrl.repo;

  // pass it on to the main handler
  return Promise.reject(err);
}

//////////// EXPORTS ////////////

module.exports = handleClocErrors;
