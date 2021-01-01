//////////// IMPORTS ////////////

var config = require('@config')

//////////// PRIVATE ////////////

function WSResponder(wsConn) {
  let sendData = function (data) {
    if (wsConn && wsConn.readyState === 1) wsConn.send(JSON.stringify(data))
  }

  let closeConn = function () {
    if (wsConn && wsConn.readyState === 1) {
      wsConn.close()
      wsConn = null
    }
  }

  return {
    update: function (text) {
      let lines = text.toString('utf-8').split('\n')
      lines.forEach((line) => {
        sendData({
          type: config.responseTypes.update,
          data: { text: line },
        })
      })
    },

    success: function (data) {
      sendData({
        type: config.responseTypes.success,
        data: data,
      })
      closeConn()
    },

    error: function (err) {
      sendData({
        type: config.responseTypes.error,
        data: err,
      })
      closeConn()
    },
  }
}

//////////// EXPORTS ////////////

module.exports = WSResponder
