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
  deleteRepoFromFilesystem
} = require('./subtasks/');

//////////////// PRIVATE ///////////////////

function serveClocData(ctrl) {
  return processRequestParams(ctrl)
    .then(checkRepoClonability)
    .then(cloneRepoInFilesystem)
    .then(getBranchNameIfNeeded)
    .then(convertRepoToClocFile)
    .then(convertClocFileToJson)
    .then(sendJsonToClient)
    .catch(err => handleClocErrors(err, ctrl))
    .finally(() => deleteRepoFromFilesystem(ctrl));
}

/////////////////// EXPORTS ///////////////////

module.exports = serveClocData;
