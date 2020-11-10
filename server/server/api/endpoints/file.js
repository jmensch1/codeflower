const fs = require('fs')
const config = require('@config')

module.exports = (req) => {
  const { repoId, path } = req.params

  if (!repoId || !path)
    return resp.error({
      statusCode: 400,
      message:'repoId, name, and path are required.',
    })

  const absPath = `${config.paths.repo(repoId)}/repo${path}`
  return fs.promises.readFile(absPath, 'utf-8')
}
