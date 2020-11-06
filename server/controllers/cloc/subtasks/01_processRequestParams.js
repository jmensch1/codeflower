//////////// IMPORTS ////////////

const config = require('@config'),
      Log = require('@log');

//////////// PRIVATE ////////////

// initialize the repo object
function processRequestParams(ctrl) {
  return new Promise((resolve, reject) => {

    if (!ctrl.params)
      reject(config.errors.NeedOwnerAndName);

    let { owner, name, branch, username, password } = ctrl.params;
    let fNameBr = `${owner}/${name}` + (branch ? `::${branch}` : '');

    Log(2, `NEW REPO: ${fNameBr}`);
    Log(2, '1. Processing Request Params');

    //// 1. construct repo object ////
    if (!owner || !name)
      reject(config.errors.NeedOwnerAndName);

    ctrl.repo = {
      owner:    owner,
      name:     name,
      branch:   branch || '',
      fullName: owner + '/' + name,
      fNameBr:  fNameBr
    };

    //// 2. handle credentials ////
    ctrl.creds = {
      username: username && username.replace(/@/g, '%40'),
      password: password && password.replace(/@/g, '%40')
    };

    delete ctrl.params.password;
    delete ctrl.params.username;

    //// 3. generate unique folderName ////
    ctrl.folderName = ctrl.repo.fullName.replace('/', '#') + '#' + ctrl.uid;

    resolve(ctrl);
  });
}

//////////// EXPORTS /////////////

module.exports = processRequestParams;
