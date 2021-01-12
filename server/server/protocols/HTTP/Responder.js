//////////// IMPORTS ////////////

const config = require('@config')

//////////// PRIVATE ////////////

function serveJson(response, statusCode, json) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
  response.end(JSON.stringify(json))
}

function HTTPResponder(response) {
  return {
    onUpdate: function (text) {
      return false
    },

    onSuccess: function (data) {
      serveJson(response, 200, {
        type: config.responseTypes.success,
        data: data,
      })
    },

    onError: function (err) {
      serveJson(response, err.statusCode, {
        type: config.responseTypes.error,
        data: err,
      })
    },
  }
}

//////////// EXPORTS ////////////

module.exports = HTTPResponder
