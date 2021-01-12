//////////// PRIVATE ////////////

function parseRequest(request) {
  return {
    endpoint: request.path.substring(1),
    params: request.method === 'GET' ? request.query : request.body,
  }
}

//////////// PUBLIC /////////////

module.exports = parseRequest
