//////////////// IMPORTS ///////////////////

const connPool = require('@util/connectionPool')(process.pid)
const config = require('@config')
const mixpanel = require('@util/mixpanel')
const Log = require('@log')
const {
  checkRepoClonability,
  cloneRepoInFilesystem,
  getBranchName,
  convertRepoToClocFile,
  getUsersJson,
  convertClocFileToJson,
} = require('./subtasks/')

//////////////// PRIVATE ///////////////////

async function serveClocData({ owner, name, branch, username, password }, onUpdate) {
  if (!owner || !name) throw config.errors.NeedOwnerAndName

  const repoId = `${owner}#${name}#${connPool.addConn()}`
  const creds = {
    username: username && encodeURIComponent(username),
    password: password && encodeURIComponent(password),
  }

  Log(2, `NEW REPO: ${repoId}`)

  Log(2, '1. Checking Repo Clonability')
  const branches = await checkRepoClonability({ owner, name, creds, onUpdate })
  if (branch && !Object.keys(branches).includes(branch))
    throw config.errors.BranchNotFound

  Log(2, '2. Cloning Repo In Filesystem')
  await cloneRepoInFilesystem({ repoId, owner, name, branch, creds, onUpdate })

  Log(2, '3. Getting Branch Name')
  if (!branch) branch = await getBranchName(repoId)

  Log(2, '4. Converting Repo To Cloc File')
  await convertRepoToClocFile(repoId, onUpdate)

  Log(2, '5. Getting Users Json')
  const users = await getUsersJson(repoId)

  Log(2, '6. Converting Cloc File To Json')
  const cloc = await convertClocFileToJson(repoId, users, onUpdate)

  Log(2, `SUCCESS: ${repoId}`)

  mixpanel.track('cloc_success', {
    distinct_id: 'user',
    repoId,
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
