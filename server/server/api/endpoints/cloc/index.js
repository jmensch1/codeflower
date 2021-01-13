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
  getCleanClocData,
  getUsersJson,
  clocToTree,
} = require('./subtasks/')

//////////////// PRIVATE ///////////////////

function mergeClocWithUsers(cloc, users) {
  return Object.keys(cloc).reduce((merged, path) => {
    merged[path] = {
      ...cloc[path],
      users: users
        .filter((user) => user.files.includes(path))
        .map((user) => user.id)
    }
    return merged
  }, {})
}

function cleanUsers(users) {
  return users.map(({ files, ...rest }) => rest)
}

async function cloc({ owner, name, branch, username, password }, onUpdate) {
  if (!owner || !name) throw config.errors.NeedOwnerAndName

  const repoId = `${owner}#${name}#${connPool.addConn()}`
  const creds = {
    username: username && encodeURIComponent(username),
    password: password && encodeURIComponent(password),
  }

  Log(2, `NEW REPO: ${repoId}`)

  Log(2, '1. Checking Repo Clonability')
  const branches = await checkRepoClonability({ owner, name, branch, creds, onUpdate })

  Log(2, '2. Cloning Repo In Filesystem')
  await cloneRepoInFilesystem({ repoId, owner, name, branch, creds, onUpdate })

  Log(2, '3. Getting Branch Name')
  if (!branch) branch = await getBranchName(repoId)

  Log(2, '4. Converting Repo To Cloc File')
  await convertRepoToClocFile(repoId, onUpdate)

  Log(2, '5. Cleaning Cloc Data')
  let { cloc, ignored } = await getCleanClocData(repoId)

  Log(2, '6. Getting Users Json')
  let users = await getUsersJson(repoId)

  Log(2, '7. Merging Cloc and Users')
  cloc = mergeClocWithUsers(cloc, users)

  Log(2, '8. Cleaning Users')
  users = cleanUsers(users)

  Log(2, '9. Concerting Cloc to Tree')
  const tree = clocToTree(cloc)

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
    cloc: {
      tree,
      ignored,
    }
  }
}

/////////////////// EXPORTS ///////////////////

module.exports = cloc
