const Log = require('@log')

module.exports = function servePing(req) {
  Log(1, 'Serving ping response.')

  let data = { message: 'codeflower server is running' }
  let hostName = process.env.HOSTNAME
  if (hostName) data.hostName = hostName

  return Promise.resolve(data)
}
