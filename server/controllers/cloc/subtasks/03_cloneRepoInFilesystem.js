//////////// IMPORTS ////////////

const { exec } = require('child_process'),
      mkpath = require('mkpath'),
      config = require('@config'),
      Log = require('@log');

//////////// PRIVATE ////////////

// turns a repo object into a git clone url
function gitCloneUrl(repo, creds) {
  let url = `https://github.com/${repo.fullName}.git`;
  if (creds.username && creds.password)
    url = url.replace('://', `://${creds.username}:${creds.password}@`);
  return url;
}

// runs git clone and returns a promise
function cloneRepoInFilesystem(ctrl) {
  return new Promise((resolve, reject) => {
    Log(2, '3. Cloning Repo In Filesystem');

    mkpath(config.paths.repos + ctrl.repo.repoId, err => {
      // it's okay if the error is that the tmp or repos folder already exists
      if (err && err.code !== 'EEXIST') {
        reject(new Error(err));
        return false;
      }

      let cloneUrl = gitCloneUrl(ctrl.repo, ctrl.creds),
          cd = `cd ${config.paths.repos}${ctrl.repo.repoId}/; `,
          clone = `git clone ${cloneUrl} --progress --single-branch` +
                  (ctrl.repo.branch ? ` --branch ${ctrl.repo.branch}` : '');

      // replace username and password, if any, with asterisks, before sending to client
      let outText = clone.replace(/https:\/\/.*?@/, 'https://******:******@');
      ctrl.resp.update('\n>> ' + outText);

      // run clone command
      let proc = exec(cd + clone, (err, stdout, stderr) => {
        if (err)
          reject(new Error(err));
        else {
          resolve(ctrl);
        }
      });

      // pipe output to socket
      // NOTE: git clone uses the stderr channel even for non-error states
      proc.stderr.on('data', ctrl.resp.update);
    });
  });
}

//////////// EXPORTS ////////////

module.exports = cloneRepoInFilesystem;
