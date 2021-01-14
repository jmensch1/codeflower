//////////////// IMPORTS ///////////////////

const connPool = require('@util/connectionPool')(process.pid)
const config = require('@config')
const mixpanel = require('@util/mixpanel')
const Log = require('@log')

const {
  checkClonability,
  cloneRepo,
  getBranchName,
  getAuthors,
} = require('./helpers/git')

const {
  execCloc,
  getCleanClocData,
  mergeAuthorsIntoCloc,
  clocToTree,
} = require('./helpers/cloc')

//////////////// PRIVATE ///////////////////

async function cloc({ owner, name, branch, username, password }, onUpdate) {
  if (!owner || !name) throw config.errors.NeedOwnerAndName

  const repoId = `${owner}#${name}#${connPool.addConn()}`
  const creds = {
    username: username && encodeURIComponent(username),
    password: password && encodeURIComponent(password),
  }

  Log(2, `NEW REPO: ${repoId}`)

  Log(2, '1. Checking Repo Clonability')
  const branches = await checkClonability({
    owner,
    name,
    branch,
    creds,
    onUpdate,
  })

  Log(2, '2. Cloning Repo In Filesystem')
  await cloneRepo({ repoId, owner, name, branch, creds, onUpdate })

  Log(2, '3. Getting Branch Name')
  if (!branch) branch = await getBranchName(repoId)

  Log(2, '4. Converting Repo To Cloc File')
  await execCloc(repoId, onUpdate)

  Log(2, '5. Cleaning Cloc Data')
  let { cloc, ignored } = await getCleanClocData(repoId)

  Log(2, '6. Getting Authors')
  let authors = await getAuthors(repoId)

  Log(2, '7. Merging Cloc and Authors')
  cloc = mergeAuthorsIntoCloc(cloc, authors)

  Log(2, '8. Cleaning Authors')
  authors = authors.map(({ files, ...rest }) => rest)

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
    authors,
    cloc: {
      tree,
      ignored,
    },
  }
}

/////////////////// EXPORTS ///////////////////

module.exports = cloc
