const fs = require('fs')

function writeJson(path, data) {
  return fs.promises.writeFile(path, JSON.stringify(data, null, 2))
}

function readJson(path) {
  return fs.promises.readFile(path, 'utf-8').then(JSON.parse)
}

module.exports = {
  writeJson,
  readJson,
}
