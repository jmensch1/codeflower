
//////////// IMPORTS ////////////

const config = require('@config'),
      url = require('url');

//////////// PRIVATE ////////////

function parseRequest(request) {
  return Promise.resolve({
    method: request.method,
    endpoint: request.path.substring(1),
    params: request.method === 'GET' ? request.query : request.body,
  })
}

//////////// PUBLIC /////////////

module.exports = parseRequest;
