// NOTE: change repo.name to repo.repoId in the cloc command to test the error state

//////////// IMPORTS ////////////

const { exec, concat } = require('@util/shell'),
      config = require('@config'),
      Log = require('@log');

//////////// PRIVATE ////////////

function convertRepoToClocFile(ctrl) {
  return new Promise((resolve, reject) => {
    Log(2, '5. Converting Repo To Cloc File');

    const cloc = concat([
      'npx cloc repo',
      '--json',
      '--skip-uniqueness',
      '--by-file',
      `--report-file=${config.cloc.dataFile}`,
      `--ignored=${config.cloc.ignoredFile}`,
    ])

    ctrl.onUpdate(`\n>> ${cloc}`)

    return exec(cloc, {
      cwd: config.paths.repo(ctrl.repo.repoId),
      onUpdate: ctrl.onUpdate,
    })
      .then(() => resolve(ctrl))
  });
}

//////////// EXPORTS ////////////

module.exports = convertRepoToClocFile;
