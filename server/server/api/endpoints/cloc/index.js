//////////////// IMPORTS ///////////////////

const {
  processRequestParams,
  checkRepoClonability,
  cloneRepoInFilesystem,
  getBranchNameIfNeeded,
  convertRepoToClocFile,
  convertClocFileToJson,
  sendJsonToClient,
  handleClocErrors,
} = require('./subtasks/');

//////////////// PRIVATE ///////////////////

function serveClocData(req, onUpdate) {
  const ctrl = { ...req, onUpdate }
  return processRequestParams(ctrl)
    .then(checkRepoClonability)
    .then(cloneRepoInFilesystem)
    .then(getBranchNameIfNeeded)
    .then(convertRepoToClocFile)
    .then(convertClocFileToJson)
    .then(sendJsonToClient)
    .catch(err => handleClocErrors(err, ctrl))
}

/////////////////// EXPORTS ///////////////////

module.exports = serveClocData;
