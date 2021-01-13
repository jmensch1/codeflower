//////////// IMPORTS ////////////

const fs = require('fs')
const config = require('@config')
const Log = require('@log')

//////////// PRIVATE ////////////

async function getBranchName(repoId) {
  Log(2, '4. Getting Branch Name')

  const dir = `${config.paths.repo(repoId)}/repo/.git/refs/heads`
  const files = await fs.promises.readdir(dir)
  return files[0]
}

//////////// EXPORTS ////////////

module.exports = getBranchName
