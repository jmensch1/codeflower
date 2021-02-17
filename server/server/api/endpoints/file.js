const fs = require('fs')
const config = require('@config')
const mixpanel = require('@util/mixpanel')

module.exports = async ({ repoId, path }) => {
  if (!repoId || !path) throw config.errors.BadFileRequest

  const absPath = config.paths.repo(repoId, 'root', path)

  try {
    const data = await fs.promises.readFile(absPath, 'utf-8')

    mixpanel.track('file', {
      distinct_id: 'user',
      repoId,
      path,
    })

    return data
  } catch(err) {
    if (err.code === 'ENOENT') throw config.errors.FileNotFound
    else throw err
  }
}
