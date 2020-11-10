// get the name of the branch if the client hasn't provided one

//////////// IMPORTS ////////////

const fs = require('fs'),
      config = require('@config'),
      Log = require('@log');

//////////// PRIVATE ////////////

function getBranchNameIfNeeded(ctrl) {
  return new Promise((resolve, reject) => {
    Log(2, '4. Getting Branch Name');

    // add the branch name to ctrl if it's not there
    new Promise((res, rej) => {
      if (ctrl.repo.branch)
        res();
      else {
        let dir = `${config.paths.repo(ctrl.repo.repoId)}/repo/.git/refs/heads`
        fs.readdir(dir, (err, files) => {
          if (err)
            rej(new Error(err))
          else {
            ctrl.repo.branch = files[0];
            res();
          }
        });
      }
    })
    .then(() => {
      // now that we have the branch name, add some useful info to ctrl
      let { repo } = ctrl;
      repo.lastCommit = repo.branches[repo.branch];
      repo.fNameBr    = `${repo.fullName}::${repo.branch}`;
      repo.githubUrl  = `https://github.com/${repo.owner}/${repo.name}/tree/${repo.branch}`;

      resolve(ctrl);
    })
    .catch(err => reject(err));
  });
}

//////////// EXPORTS ////////////

module.exports = getBranchNameIfNeeded;
