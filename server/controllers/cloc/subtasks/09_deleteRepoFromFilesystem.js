//////////// IMPORTS ////////////

const rimraf = require('rimraf'),
      config = require('@config'),
      Log = require('@log');

//////////// PRIVATE ////////////

function deleteRepoFromFilesystem(ctrl) {
  return new Promise((resolve, reject) => {
    Log(2, '9. Deleting Repo From Filesystem');

    if (!config.deleteAfterClone)
      resolve(ctrl);
    else
      rimraf(config.paths.repos + ctrl.folderName, (err) => {
        if (err)
          reject(new Error(err));
        else
          resolve(ctrl);
      });
  });
}

//////////// EXPORTS ////////////

module.exports = deleteRepoFromFilesystem;
