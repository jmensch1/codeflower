// NOTE: change repo.name to repo.repoId in the cloc command to test the error state

//////////// IMPORTS ////////////

const { exec } = require('child_process'),
      config = require('@config'),
      Log = require('@log');

//////////// PRIVATE ////////////

function convertRepoToClocFile(ctrl) {
  return new Promise((resolve, reject) => {
    Log(2, '5. Converting Repo To Cloc File');

    let cd = 'cd ' + config.paths.repos + ctrl.repo.repoId + '; ',
        cloc = 'npx cloc ' + ctrl.repo.name +
               ' --csv --by-file ' +
               `--ignored=${config.cloc.ignoredFile} ` +
               `--report-file=${config.cloc.dataFile}`;

    ctrl.resp.update('\n>> ' + cd + cloc);

    let proc = exec(cd + cloc, (err) => {
      if (err)
        reject(new Error(err));
      else
        resolve(ctrl);
    });

    proc.stdout.on('data', ctrl.resp.update);
    proc.stderr.on('data', ctrl.resp.update);
  });
}

//////////// EXPORTS ////////////

module.exports = convertRepoToClocFile;
