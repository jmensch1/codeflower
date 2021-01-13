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
const connPool = require('@util/connectionPool')(process.pid)
const config = require('@config')

//////////////// PRIVATE ///////////////////

async function serveClocData({ owner, name, branch, username, password }, onUpdate) {
  const uid = connPool.addConn()
  const fullName = `${owner}/${name}`
  const fNameBr = fullName + (branch ? `::${branch}` : '')
  const repoId = fullName.replace('/', '#') + '#' + uid
  const creds = {
    username: username && encodeURIComponent(username),
    password: password && encodeURIComponent(password),
  }

  if (!owner || !name) throw config.errors.NeedOwnerAndName

  const branches = await checkRepoClonability({ owner, name, creds, onUpdate })

  if (branch && !Object.keys(branches).includes(branch))
    throw config.errors.BranchNotFound

  const ctrl = {
    uid,
    repo: {
      owner,
      name,
      branch,
      fullName,
      fNameBr,
      repoId,
      branches,
    },
    creds,
    onUpdate
  }

  return cloneRepoInFilesystem(ctrl)
    .then(getBranchNameIfNeeded)
    .then(convertRepoToClocFile)
    .then(getUsersJson)
    .then(convertClocFileToJson)
    .then(sendJsonToClient)
    .catch((err) => handleClocErrors(err, ctrl))
}

/////////////////// EXPORTS ///////////////////

module.exports = serveClocData
