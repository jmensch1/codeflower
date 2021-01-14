//////////// IMPORTS ////////////

const { exec, concat } = require('@util/shell')
const config = require('@config')

//////////// PRIVATE ////////////

async function execCloc(repoId, onUpdate) {
  const cwd = config.paths.repo(repoId)

  const cloc = concat([
    'npx cloc root',
    '--json',
    '--skip-uniqueness',
    '--by-file',
    `--report-file=${config.cloc.dataFile}`,
    `--ignored=${config.cloc.ignoredFile}`,
  ])

  onUpdate(`\n>> ${cloc}`)

  await exec(cloc, { cwd, onUpdate })
}

//////////// EXPORTS ////////////

module.exports = execCloc
