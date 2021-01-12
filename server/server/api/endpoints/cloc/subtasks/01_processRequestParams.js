//////////// IMPORTS ////////////

const config = require('@config'),
  Log = require('@log'),
  connPool = require('@util/connectionPool')(process.pid)

//////////// PRIVATE ////////////

// initialize the repo object
function processRequestParams({ owner, name, branch, username, password }) {
  const fullName = `${owner}/${name}`
  const fNameBr = fullName + (branch ? `::${branch}` : '')

  Log(2, `NEW REPO: ${fNameBr}`)
  Log(2, '1. Processing Request Params')

  //// 1. construct repo object ////
  if (!owner || !name) throw config.errors.NeedOwnerAndName

  const uid = connPool.addConn()

  const repo = {
    owner,
    name,
    fullName,
    fNameBr,
    branch: branch || '',
    repoId: fullName.replace('/', '#') + '#' + uid,
  }

  //// 2. handle credentials ////
  const creds = {
    username: username && encodeURIComponent(username),
    password: password && encodeURIComponent(password),
  }

  return { uid, repo, creds }
}

//////////// EXPORTS /////////////

module.exports = processRequestParams
