//////////// IMPORTS ////////////

const config = require('@config'),
      Log = require('@log');

//////////// PRIVATE ////////////

// initialize the repo object
function processRequestParams(ctrl) {
  return new Promise((resolve, reject) => {

    if (!ctrl.params)
      reject(config.errors.NeedOwnerAndName);

    const { owner, name, branch, username, password } = ctrl.params;
    const fullName = `${owner}/${name}`
    const fNameBr = fullName + (branch ? `::${branch}` : '');

    Log(2, `NEW REPO: ${fNameBr}`);
    Log(2, '1. Processing Request Params');

    //// 1. construct repo object ////
    if (!owner || !name)
      reject(config.errors.NeedOwnerAndName);

    ctrl.repo = {
      owner,
      name,
      fullName,
      fNameBr,
      branch: branch || '',
      repoId: fullName.replace('/', '#') + '#' + ctrl.uid,
    };

    //// 2. handle credentials ////
    ctrl.creds = {
      username: username && username.replace(/@/g, '%40'),
      password: password && password.replace(/@/g, '%40')
    };

    delete ctrl.params.password;
    delete ctrl.params.username;

    resolve(ctrl);
  });
}

//////////// EXPORTS /////////////

module.exports = processRequestParams;
