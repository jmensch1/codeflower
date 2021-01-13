//////////// IMPORTS ////////////

const { exec, concat } = require('@util/shell')
const config = require('@config')
const fs = require('fs')

//////////// PRIVATE ////////////

// turns a repo object into a git clone url
function gitCloneUrl(owner, name, creds) {
  let url = `https://github.com/${owner}/${name}.git`
  if (creds.username && creds.password)
    url = url.replace('://', `://${creds.username}:${creds.password}@`)
  return url
}

// runs git clone and returns a promise
async function cloneRepoInFilesystem({ repoId, owner, name, branch, creds, onUpdate }) {
  const cwd = config.paths.repo(repoId)

  await fs.promises.mkdir(cwd, { recursive: true })

  const cloneUrl = gitCloneUrl(owner, name, creds)
  const clone = concat([
    `git clone ${cloneUrl}`,
    `--progress`,
    `--single-branch`,
    branch ? `--branch ${branch}` : null,
    `repo`,
  ])

  // replace username and password, if any, with asterisks, before sending to client
  const outText = clone.replace(/https:\/\/.*?@/, 'https://******:******@')
  onUpdate('\n>> ' + outText)

  await exec(clone, { cwd, onUpdate })
}

//////////// EXPORTS ////////////

module.exports = cloneRepoInFilesystem
