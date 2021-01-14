//////////// IMPORTS ////////////

const config = require('@config')
const { exec } = require('@util/shell')

//////////// PRIVATE ////////////

async function getBranchName(repoId) {
  const { stdout } = await exec('git branch', {
    cwd: `${config.paths.repo(repoId)}/root`
  })

  return stdout.split('\n')[0].replace('* ', '')
}

//////////// EXPORTS ////////////

module.exports = getBranchName
