////////////////////// IMPORTS /////////////////////////

const ws = require('ws');

////////////////////// PRIVATE /////////////////////////

function createServer(server, baseHttpServer) {
  let wsServer = new ws.Server({server: baseHttpServer});
  wsServer.on('connection', conn => {
    conn.on('message', req => {
      server(req, conn);
    });
  });
  return wsServer;
}

////////////////////// EXPORTS /////////////////////////

module.exports = createServer;