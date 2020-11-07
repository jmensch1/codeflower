// Generates a unique id for each connection to the server,
// and tracks the active connections in an array of those ids.
// The number of active connections is available in the pm2 monitor.

/////////////// PRIVATE ////////////////

function connectionPool(processId) {
  let curId = 0;

  return {
    addConn: () => {
      curId = (curId + 1) % (1 << 16)
      return processId + '_' + curId
    },
  };
}

//////////////// PUBLIC ////////////////

module.exports = connectionPool;
