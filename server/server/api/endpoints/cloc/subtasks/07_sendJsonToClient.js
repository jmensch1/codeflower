//////////// IMPORTS ////////////

const config = require('@config'),
  Log = require('@log')

//////////// PRIVATE ////////////

function sendJsonToClient(ctrl) {
  return new Promise((resolve, reject) => {
    Log(2, '7. Sending Json To Client')
    Log(1, 'SUCCESS:', ctrl.repo.fNameBr, ctrl.uid)

    resolve(ctrl.repo)
  })
}

//////////// EXPORTS ////////////

module.exports = sendJsonToClient
