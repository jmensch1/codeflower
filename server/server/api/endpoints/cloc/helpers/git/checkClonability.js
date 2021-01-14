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

// uses the git ls-remote command to determine:
// (1) whether the repo exists
// (2) whether the branch exists
// (3) whether the repo requires credentials
// (4) whether the credentials, if given, are valid
async function checkClonability({ owner, name, branch, creds, onUpdate }) {
  // construct the git ls-remote command.
  // using '******' as a fallback is a trick that lets us
  // distinguish between invalid credentials and non-existent repos,
  // without triggering a username/password prompt
  const user = creds.username || '******'
  const pass = creds.password || '******'
  const lsRemote = concat([
    'git ls-remote',
    `-h "https://${user}:${pass}@github.com/${owner}/${name}"`,
  ])

  // echo the command (but not credentials)
  onUpdate('>> ' + lsRemote.replace(/\/.*?@/, '//******:******@'))

  try {
    var { stdout } = await exec(lsRemote, { onUpdate })
  } catch (err) {
    const { stderr } = err
    // err happens if the credentials are wrong or the repo doesn't exist
    // Repository not found => credentials are correct AND repository does not exist
    // Invalid username or password => credentials are not correct AND repository may or may not exist
    if (stderr.match(/Invalid username or password/))
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
