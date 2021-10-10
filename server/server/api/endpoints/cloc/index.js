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

async function cloc({ owner, name, branch, creds }, onUpdate) {
  if (!owner || !name) throw config.errors.NeedOwnerAndName

  const repoId = `${owner}#${name}#${connPool.addConn()}`

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
  let cloc = await getCleanClocData(repoId, onUpdate)

  // Log(2, '6. Getting Authors')
  // let authors = await getAuthors(repoId, onUpdate)
  //
  // Log(2, '7. Merging Cloc and Authors')
  // cloc = mergeAuthorsIntoCloc(cloc, authors, onUpdate)
  //
  // Log(2, '8. Cleaning Authors')
  // authors = authors.map(({ files, ...rest }) => rest)

  Log(2, '9. Converting Cloc to Tree')
  const tree = clocToTree(cloc, onUpdate)

  Log(2, `SUCCESS: ${repoId}`)

  mixpanel.track('cloc_success', {
    distinct_id: 'user',
    repoId,
  })

  onUpdate('\nSending data...\n')

  return {
    owner,
    name,
    branch,
    repoId,
    branches,
    // authors,
    tree,
  }
}

/////////////////// EXPORTS ///////////////////

module.exports = cloc
