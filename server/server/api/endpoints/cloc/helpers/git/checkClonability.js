//////////// IMPORTS ////////////

const { exec, concat } = require('@util/shell')
const config = require('@config')

//////////// PRIVATE //////////////

// scans lsRemote output and returns an object of branches
// where the keys are the branch names and the values are the shas
function getBranches(lsRemoteOutput) {
  const branches = {}
  lsRemoteOutput
    .split('\n')
    .slice(0, -1)
    .map((line) => line.split('\t'))
    .forEach((line) => {
      branches[line[1].replace('refs/heads/', '')] = line[0]
    })
  return branches
}

async function checkClonability({ owner, name, branch, creds, onUpdate }) {
  const lsRemote = concat([
    'GIT_TERMINAL_PROMPT=0',
    'git ls-remote',
    `-h "https://${creds.password ? `${creds.password}@` : ''}github.com/${owner}/${name}"`,
  ])

  // echo the command (but not the access token)
  const cmd = lsRemote
    .replace('GIT_TERMINAL_PROMPT=0', '')
    .replace(/\/\/.*?@/, '//******@')

  onUpdate(`>> ${cmd}`)

  try {
    var { stdout } = await exec(lsRemote, { onUpdate })
  } catch (err) {
    const { stderr } = err
    if (stderr.match(/fatal: could not read/))
      throw creds.username && creds.password
        ? config.errors.CredentialsInvalid
        : config.errors.NeedCredentials
    else if (stderr.match(/Repository not found/))
      throw config.errors.RepoNotFound
    else throw err
  }

  // check if branch exists
  const branches = getBranches(stdout) 
  if (branch && !Object.keys(branches).includes(branch))
    throw config.errors.BranchNotFound
  return branches
}

//////////// EXPORTS //////////////

module.exports = checkClonability
