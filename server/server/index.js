////////// INITIALIZE 3RD-PARTY TOOLS ////////////

require('module-alias/register');




//////////////////// IMPORTS //////////////////////

const config        = require('@config'),
      Log           = require('@log'),
      HTTP          = require('./HTTP/'),
      WS            = require('./WS/'),
      connPool      = require('./util/connectionPool')(process.pid),
      serveResponse = require('./api/serveResponse'),
      setHostName   = require('./util/setHostName');




/////////// A PROTOCOL-AGNOSTIC SERVER ////////////

function server(protocol, request, response) {
  serveResponse({
    connId:    connPool.addConn(),
    request:   request,
    parse:     protocol.parseRequest,
    responder: protocol.Responder(response)
  });
}




////////////////////// MAIN ////////////////////////

// create http and ws servers
let httpServer = HTTP.createServer(server.bind(null, HTTP)),
    wsServer   = WS.createServer(server.bind(null, WS), httpServer);

// start listening
let port = config.ports.HTTP;
httpServer.listen(port, () => {
  Log(1, `WS and HTTP servers started on port ${port}...`);
  setHostName();
  if (process.send) process.send('ready');
});
