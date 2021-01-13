//////////// IMPORTS ////////////

const config = require('@config'),
      Log = require('@log'),
      mixpanel = require('@util/mixpanel')

//////////// PRIVATE ////////////

function sendJsonToClient(fNameBr) {
  Log(2, '7. Sending Json To Client')
  Log(1, 'SUCCESS:', fNameBr)

  mixpanel.track('cloc_success', {
    distinct_id: 'user',
    fNameBr,
  })
}

//////////// EXPORTS ////////////

module.exports = sendJsonToClient
