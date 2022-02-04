const Log = require('@log')

module.exports = function servePing() {
  Log(1, 'Serving ping response.')

  let data = { 
    message: 'codeflower server is running',
    githubSha: process.env.GITHUB_SHA || null,
  }

  let hostName = process.env.HOSTNAME
  if (hostName) data.hostName = hostName

  return Promise.resolve(data)
}
