require('module-alias/register')

const config = require('@config')
const Log = require('@log')
const HTTP = require('./HTTP/')
const WS = require('./WS/')
const serveResponse = require('./api/serveResponse')
const setHostName = require('./util/setHostName')

/////////// A PROTOCOL-AGNOSTIC SERVER ////////////

function server(protocol, request, response) {
  serveResponse({
    request: request,
    parse: protocol.parseRequest,
    responder: protocol.Responder(response),
  })
}

////////////////////// MAIN ////////////////////////

// create http and ws servers
const httpServer = HTTP.createServer(server.bind(null, HTTP))
WS.createServer(server.bind(null, WS), httpServer)

// start listening
const port = config.ports.HTTP
httpServer.listen(port, () => {
  Log(1, `WS and HTTP servers started on port ${port}...`)
  setHostName()
})
