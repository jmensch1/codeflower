
/////////////////////// IMPORTS ////////////////////////

const config = require('@config')
const endpoints = require('./endpoints')
const handleErrors = require('./handleErrors')

/////////////////////// PRIVATE ////////////////////////

function serveResponse({ request, parse, responder }) {
  return parse(request)
    .then(({ endpoint, params }) => {
      const handler = (() => {
        switch (endpoint) {
          case 'ping': return endpoints.ping
          case 'cloc': return endpoints.cloc
          case 'file': return endpoints.file
          case 'users': return endpoints.users
          default: return null
        }
      })()

      if (!handler)
        return Promise.reject({
          ...config.errors.EndpointNotRecognized,
          endpoint: endpoint
        })

      if (endpoint === 'cloc')
        return handler({ params, endpoint }, responder.update)
          .then((data) => responder.success(data))

      return handler({
        resp: responder,
        params: params,
        uid: connId,
      })
    })
    .catch(err => handleErrors(err, responder))
}

/////////////////////// EXPORTS ////////////////////////

module.exports = serveResponse;
