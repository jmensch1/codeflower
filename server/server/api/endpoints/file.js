const fs = require('fs')
const config = require('@config')

module.exports = ({ repoId, path }) => {
  if (!repoId || !path) throw config.errors.BadFileRequest

  const absPath = config.paths.repo(repoId, 'root', path)
  return fs.promises.readFile(absPath, 'utf-8').catch((err) => {
    if (err.code === 'ENOENT') throw config.errors.FileNotFound
    else throw err
  })
}
