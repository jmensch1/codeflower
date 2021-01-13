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
const mixpanel = require('@util/mixpanel')

//////////////// PRIVATE ///////////////////

async function serveClocData({ owner, name, branch, username, password }, onUpdate) {
  const repoId = `${owner}#${name}#${connPool.addConn()}`

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

  await convertRepoToClocFile(repoId, onUpdate)

  const users = await getUsersJson(repoId)

  const cloc = await convertClocFileToJson(repoId, users, onUpdate)

  mixpanel.track('cloc_success', {
    distinct_id: 'user',
    fNameBr: `${owner}/${name}::${branch}`,
  })

  return {
    owner,
    name,
    branch,
    repoId,
    branches,
    users,
    cloc,
  }
}

/////////////////// EXPORTS ///////////////////

module.exports = serveClocData
