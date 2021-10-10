//////////// IMPORTS ////////////

const { exec, concat } = require('@util/shell')
const config = require('@config')
const fs = require('fs')

//////////// PRIVATE ////////////

// turns a repo object into a git clone url
function gitCloneUrl(owner, name, creds) {
  const token = creds ? creds.token : undefined
  return `https://${token ? `${token}@` : ''}github.com/${owner}/${name}.git`
}

// runs git clone and returns a promise
async function cloneRepo({ repoId, owner, name, branch, creds, onUpdate }) {
  const cwd = config.paths.repo(repoId)

  await fs.promises.mkdir(cwd, { recursive: true })

  const cloneUrl = gitCloneUrl(owner, name, creds)
  const clone = concat([
    `git clone ${cloneUrl}`,
    `--progress`,
    `--single-branch`,
    branch ? `--branch ${branch}` : null,
    `root`,
  ])

  // replace token, if any, with asterisks, before sending to client
  const outText = clone.replace(/https:\/\/.*?@/, 'https://******@')
  onUpdate('\n>> ' + outText)

  await exec(clone, { cwd, onUpdate })
}

//////////// EXPORTS ////////////

module.exports = cloneRepo
