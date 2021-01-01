//////////// IMPORTS ////////////

const config = require('@config')

//////////// PRIVATE ////////////

function parseRequest(request) {
  return new Promise((resolve, reject) => {
    let reqInfo
    try {
      reqInfo = JSON.parse(request)
    } catch (e) {
      reject(config.errors.ParseError)
    }
    resolve(reqInfo)
  })
}

//////////// PUBLIC /////////////

module.exports = parseRequest
