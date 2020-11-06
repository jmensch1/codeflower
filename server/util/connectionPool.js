// Generates a unique id for each connection to the server,
// and tracks the active connections in an array of those ids.
// The number of active connections is available in the pm2 monitor.

/////////////// IMPORTS ////////////////

const Probe = require('pmx').probe(),
      getCurrentTime = require('./getCurrentTime');

/////////////// METRICS ////////////////

const activeConns = Probe.metric({ name: 'activeConns' });

const totalConns = Probe.metric({ name: 'totalConns' });

const lastRequestTime = Probe.metric({ name: 'lastRequestTime' });
lastRequestTime.set('');

/////////////// PRIVATE ////////////////

function connectionPool(processId) {

  let conns = [],
      curId = 0;

  return {
    addConn: () => {
      // add new id to conns array
      curId = (curId + 1) % (1 << 16);
      let connId = processId + '_' + curId;
      conns.push(connId);

      // update metrics
      activeConns.set(conns.length);
      totalConns.set(curId);
      lastRequestTime.set(getCurrentTime());

      return connId;
    },

    removeConn: (id) => {
      let idx = conns.indexOf(id);
      if (idx !== -1) {
        conns.splice(idx, 1);
        activeConns.set(conns.length);
      }
    }
  };
}

//////////////// PUBLIC ////////////////

module.exports = connectionPool;

