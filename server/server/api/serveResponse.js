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
          case 'ping':
            return endpoints.ping
          case 'cloc':
            return endpoints.cloc
          case 'file':
            return endpoints.file
          case 'users':
            return endpoints.users
          case 'error':
            throw new Error('testing error')
          default:
            return null
        }
      })()

      if (!handler)
        return Promise.reject({
          ...config.errors.EndpointNotRecognized,
          endpoint,
        })

      return handler({ params, endpoint }, responder.update)
    })
    .then((data) => responder.success(data))
    .catch((err) => handleErrors(err, responder.error))
}

/////////////////////// EXPORTS ////////////////////////

module.exports = serveResponse
