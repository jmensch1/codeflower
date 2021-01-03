// deletes all repos older than MAX_AGE (in ms)

require('module-alias/register')

const config = require('@config')
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const MAX_AGE = 24 * 60 * 60 * 1000

console.log('running cron script')

const { repos } = config.paths

if (fs.existsSync(repos))
  fs.readdirSync(repos).forEach(name => {
    const absPath = path.join(repos, name)
    const { birthtimeMs } = fs.statSync(absPath)
    const age = Date.now() - birthtimeMs
    if (age > MAX_AGE) {
      console.log('deleting:', absPath)
      rimraf.sync(absPath)
    }
  })

console.log('finished cron script')
