// send WS and HTTP requests to a running server

//////////////////// IMPORTS //////////////////////

const WebSocket = require('ws'),
      http = require('http'),
      https = require('https'),
      config = require('@config'),
      argv = require('minimist')(process.argv);

/////////////////// CONSTANTS /////////////////////

// server config
const HOST          = 'localhost',
      HTTP_PROTOCOL = config.protocols.HTTP,
      WS_PROTOCOL   = config.protocols.WS,
      HTTP_PORT     = config.ports.HTTP,
      WS_PORT       = config.ports.WS

const RES_TYPES = config.responseTypes;

/////////////////// FUNCTIONS /////////////////////

function wsReq({ request, onUpdate=()=>{}, sendRaw=false }) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`${WS_PROTOCOL}://${HOST}:${WS_PORT}`, {
      rejectUnauthorized: false
    });

    let payload = sendRaw ? request : JSON.stringify(request);
    ws.on('open', () => ws.send(payload));

    ws.on('message', msg => {
      msg = JSON.parse(msg);
      if (msg.type === config.responseTypes.update)
        onUpdate(msg.data.text);
      else
        resolve(msg);
    });

    ws.on('close', reject);

    ws.on('error', reject);
  });
}

function httpReq({ request, sendRaw=false }) {
  return new Promise((resolve, reject) => {

    let reqModule = HTTP_PROTOCOL === 'https' ? https : http;

    let opts = {
      method: request.method || 'POST',
      protocol: `${HTTP_PROTOCOL}:`,
      hostname: HOST,
      port: HTTP_PORT,
      path: `/${request.endpoint}`,
      rejectUnauthorized: false,
      headers: { 'Content-Type': 'application/json' },
    };

    let req = reqModule.request(opts, res => {
      let body = '';
      res.on('data', data => body += data);
      res.on('end', () => resolve(JSON.parse(body)));
    })
    .on('error', reject);

    let payload = sendRaw ?
                  request.params :
                  JSON.stringify(request.params);

    req.write(payload);
    req.end();

  });
}

function showResponse(res) {
  switch(res.type) {
    case RES_TYPES.success:
      const { owner, name, branch } = res.data
      console.log("SUCCESS: " + `${owner}/${name}::${branch}`);
      break;
    case RES_TYPES.error:
      console.log("ERROR: ", res.data);
      break;
  }
}

function showError(err) {
  console.log("ERROR:", err);
}

function testResponse(test, res) {
  let passed = test.expect(res);
  let output = (test.expect(res) ? 'PASSED: ' : '\nFAILED: ') +
               test.desc;
  console.log(output);
  if (!passed)
    console.log("output:", res, '\n');
}

/////////////////// EXPORTS /////////////////////

module.exports = {
  httpReq,
  wsReq,
  showResponse,
  showError,
  testResponse
};
