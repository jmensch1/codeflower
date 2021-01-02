//////////// IMPORTS ////////////

const config = require('@config'),
      Log = require('@log'),
      mixpanel = require('@util/mixpanel')

//////////// PRIVATE ////////////

function sendJsonToClient(ctrl) {
  return new Promise((resolve, reject) => {
    Log(2, '7. Sending Json To Client')
    Log(1, 'SUCCESS:', ctrl.repo.fNameBr, ctrl.uid)

    mixpanel.track('cloc_success', {
      distinct_id: 'user',
      fNameBR: ctrl.repo.fNameBr,
    })

    resolve(ctrl.repo)
  })
}

//////////// EXPORTS ////////////

module.exports = sendJsonToClient
