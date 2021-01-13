//////////// IMPORTS ////////////

const fs = require('fs')
const config = require('@config')

//////////// PRIVATE ////////////

async function getBranchName(repoId) {
  const dir = `${config.paths.repo(repoId)}/repo/.git/refs/heads`
  const files = await fs.promises.readdir(dir)
  return files[0]
}

//////////// EXPORTS ////////////

module.exports = getBranchName
