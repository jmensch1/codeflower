const Log = require('@log')

module.exports = function servePing({ resp }) {
  Log(1, 'Serving ping response.');

  let data = { message: 'server is running' };
  let hostName = process.env.HOSTNAME;
  if (hostName)
    data.hostName = hostName;

  resp.success(data);
  return Promise.resolve();
}
