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
  const repoId = fullName.replace('/', '#') + '#' + uid
  const creds = {
    username: username && encodeURIComponent(username),
    password: password && encodeURIComponent(password),
  }

  if (!owner || !name) throw config.errors.NeedOwnerAndName

  const branches = await checkRepoClonability({ owner, name, creds, onUpdate })

  if (branch && !Object.keys(branches).includes(branch))
    throw config.errors.BranchNotFound

  await cloneRepoInFilesystem({ repoId, owner, name, branch, creds, onUpdate })

  if (!branch) branch = await getBranchNameIfNeeded(repoId)

  const fNameBr = `${fullName}::${branch}`

  await convertRepoToClocFile(repoId, onUpdate)

  const users = await getUsersJson(repoId)

  const cloc = await convertClocFileToJson(repoId, users, onUpdate)

  sendJsonToClient(fNameBr, uid)

  return {
    owner,
    name,
    branch,
    fullName,
    fNameBr,
    repoId,
    branches,
    lastCommit: branches[branch],
    users,
    cloc,
  }
}

/////////////////// EXPORTS ///////////////////

module.exports = serveClocData
