//////////////// IMPORTS ///////////////////

const {
  processRequestParams,
  checkRepoClonability,
  cloneRepoInFilesystem,
  getBranchNameIfNeeded,
  convertRepoToClocFile,
  getUsersJson,
  convertClocFileToJson,
  sendJsonToClient,
  handleClocErrors,
} = require('./subtasks/')

//////////////// PRIVATE ///////////////////

function serveClocData(params, onUpdate) {
  const ctrl = { params, onUpdate }

  return processRequestParams(ctrl)
    .then(checkRepoClonability)
    .then(cloneRepoInFilesystem)
    .then(getBranchNameIfNeeded)
    .then(convertRepoToClocFile)
    .then(getUsersJson)
    .then(convertClocFileToJson)
    .then(sendJsonToClient)
    .catch((err) => handleClocErrors(err, ctrl))
}

/////////////////// EXPORTS ///////////////////

module.exports = serveClocData
