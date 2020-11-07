////////////////////// IMPORTS /////////////////////////

const http = require('http'),
      https = require('https'),
      fs = require('fs'),
      config = require('@config');

////////////////////// PRIVATE /////////////////////////

let createServer;

if (config.protocols.HTTP === 'https')
  createServer = (server) => {
    return https.createServer({
      key:  fs.readFileSync(config.paths.SSL.key,  'utf8'),
      cert: fs.readFileSync(config.paths.SSL.cert, 'utf8')
    }, server);
  };
else
  createServer = http.createServer;

////////////////////// EXPORTS /////////////////////////

module.exports = createServer;