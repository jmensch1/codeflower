const fs = require('fs')
const config = require('@config')

module.exports = ({ resp, params }) => {
  const { repoId, name, path } = params

  if (!repoId || !name || !path)
    return resp.error({
      statusCode: 400,
      message:'repoId, name, and path are required.',
    })

  const absPath = `${config.paths.repos}${repoId}/${name}${path}`;
  fs.readFile(absPath, 'utf8', function(err, text) {
    if (err)
      resp.error({
        statusCode: 500,
        error: err,
      })
    else
      resp.success(text)
  });
}
