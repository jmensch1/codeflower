//////////// IMPORTS ////////////

const { exec, concat } = require('@util/shell'),
      mkpath = require('mkpath'),
      config = require('@config'),
      Log = require('@log')

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

    const cwd = config.paths.repo(ctrl.repo.repoId)

    mkpath(cwd, err => {
      // it's okay if the error is that the tmp or repos folder already exists
      if (err && err.code !== 'EEXIST') {
        reject(new Error(err));
        return false;
      }

      const cloneUrl = gitCloneUrl(ctrl.repo, ctrl.creds)
      const clone = concat([
        `git clone ${cloneUrl}`,
        `--progress`,
        `--single-branch`,
        (
          ctrl.repo.branch
            ? `--branch ${ctrl.repo.branch}`
            : null
        ),
        `repo`
      ])

      // replace username and password, if any, with asterisks, before sending to client
      let outText = clone.replace(/https:\/\/.*?@/, 'https://******:******@');
      ctrl.onUpdate('\n>> ' + outText);

      return exec(clone, { cwd, onUpdate: ctrl.onUpdate })
        .then(() => resolve(ctrl))
    });
  });
}

//////////// EXPORTS ////////////

module.exports = cloneRepoInFilesystem;
