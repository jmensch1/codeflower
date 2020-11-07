
/////////////////////// IMPORTS ////////////////////////

const config = require('@config'),
      serveClocData = require('./endpoints/cloc'),
      servePing = require('./endpoints/ping'),
      serveFile = require('./endpoints/file'),
      handleErrors = require('./handleErrors'),
      testRepo = require('./test-repo.json');

/////////////////////// PRIVATE ////////////////////////

function serveResponse({ connId, request, parse, responder }) {
  return parse(request)
    .then(reqInfo => {
      switch(reqInfo.endpoint) {
        case config.endpoints.cloc:
          return serveClocData({
            resp:   responder,
            params: reqInfo.params,
            uid:    connId
          });
        case config.endpoints.ping:
          return servePing({
            resp: responder
          });
        case config.endpoints.file:
          return serveFile({
            resp:   responder,
            params: reqInfo.params,
          })
        case 'test-repo':
          return responder.success(testRepo);
        default:
          return Promise.reject({
            ...config.errors.EndpointNotRecognized,
            endpoint: reqInfo.endpoint
          });
      }
    })
    .catch(err => handleErrors(err, responder))
    .then(() => Promise.resolve(connId));
}

/////////////////////// EXPORTS ////////////////////////

module.exports = serveResponse;
