//////////// IMPORTS ////////////

const config = require('@config'),
      Log = require('@log');

//////////// PRIVATE ////////////

function sendJsonToClient(ctrl) {
  return new Promise((resolve, reject) => {
    Log(2, '7. Sending Json To Client');
    Log(1, 'SUCCESS:', ctrl.repo.fNameBr, ctrl.uid);

    ctrl.resp.success(ctrl.repo);
    resolve(ctrl);
  });
}

//////////// EXPORTS ////////////

module.exports = sendJsonToClient;
