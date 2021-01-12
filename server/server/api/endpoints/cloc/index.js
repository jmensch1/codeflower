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

function serveClocData({ owner, name, branch, username, password }, onUpdate) {
  const { uid, repo, creds } = processRequestParams({
    owner,
    name,
    branch,
    username,
    password,
  })
  
  const ctrl = { uid, repo, creds, onUpdate }

  return checkRepoClonability(ctrl)
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
