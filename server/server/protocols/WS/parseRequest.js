//////////// IMPORTS ////////////

const config = require('@config')

//////////// PRIVATE ////////////

function parseRequest(request) {
  try {
    const { endpoint, params } = JSON.parse(request)
    return { endpoint, params }
  } catch (e) {
    throw config.errors.ParseError
  }
}

//////////// PUBLIC /////////////

module.exports = parseRequest
