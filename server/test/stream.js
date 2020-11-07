
/*

  This script creates and maintains a given number of simultaneous,
  active connections with the server. 

  This is useful for seeing how the respond to load. If we need 
  to know how the server will react to 50 simultaneous connections,
  set the CONN_TARGET parameter to 50 and the scripts will spin up,
  and maintain, 50 connections with the server at all times (with 
  the occassional drop to 48 or 49).

  Also useful for debugging the graceful restart script, /bin/reload-pm2.js.
  If you run the reload script while also running this one, you can 
  see whether the server would drop connections in the event of a restart.

  REQUEST_INTERVAL is the number of milliseconds to wait
  between logs of the number of active actions. reqFunc is a 
  function that sends a request to the server. 

*/

///////////////////////////////// IMPORTS //////////////////////////////////////

require('module-alias/register');

const config = require('@config'),
      { httpReq, wsReq, showResponse, showError } = require('./_common'),
      argv = require('minimist')(process.argv);

//////////////////////////////// CONSTANTS /////////////////////////////////////

const CONN_TARGET      = argv.n || 5;

const REQUEST_INTERVAL = argv.i || 1000;

const TEST_REQUEST = {
  endpoint: 'cloc',
  params: {
    owner:  'code-flower',
    name:   'pm2',
    branch: ''
  }
};

// const TEST_REQUEST = {
//   endpoint: 'cloc',
//   params: {
//     owner: 'code-flower',
//     name:  'docs',
//     branch: ''
//   }
// };

/////////////////////////////////// MAIN ///////////////////////////////////////

let reqFunc = argv.http ? httpReq : wsReq;

let activeConns = 0;
setInterval(() => {

  console.log("active connections:", activeConns);

  if (activeConns < CONN_TARGET) {
    activeConns++;
    reqFunc({ request: TEST_REQUEST })
      .then(res => activeConns--)
      .catch(err => {
        console.log("ERROR:", err.code || err);
        activeConns--;
      });
  }

}, REQUEST_INTERVAL);




