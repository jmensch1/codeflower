// deletes all repos older than MAX_AGE (in ms)

require('module-alias/register')

const config = require('@config')
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const MAX_AGE = 24 * 60 * 60 * 1000

const { repos } = config.paths
fs.readdirSync(repos).forEach(name => {
  const absPath = path.join(repos, name)
  const { birthtimeMs } = fs.statSync(absPath)
  const age = Date.now() - birthtimeMs
  if (age > MAX_AGE) rimraf.sync(absPath)
})
