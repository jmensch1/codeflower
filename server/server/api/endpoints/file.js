const fs = require('fs')
const config = require('@config')
const mixpanel = require('@util/mixpanel')
const hljs = require('highlight.js')

module.exports = async ({ repoId, path, highlight = true }) => {
  if (!repoId || !path) throw config.errors.BadFileRequest

  const absPath = config.paths.repo(repoId, 'root', path)

  try {
    let data = await fs.promises.readFile(absPath, 'utf-8')

    if (highlight) data = hljs.highlightAuto(data).value

    mixpanel.track('file_success', {
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
