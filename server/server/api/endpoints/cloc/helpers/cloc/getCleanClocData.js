const config = require('@config')
const { readJson, writeJson } = require('@util/files')

async function getCleanCloc(repoId) {
  const clocFile = config.paths.repo(repoId, config.cloc.dataFile)
  const cleanClocFile = config.paths.repo(repoId, 'cloc-clean.json')

  let cloc
  try {
    cloc = await readJson(clocFile)
  } catch(err) {
    if (err.code === 'ENOENT')
      // if cloc did not create a file (e.g., because there are no
      // code files in the repo), create dummy json
      return {
        name: 'root',
        children: [],
      }
  }

  // delete unused keys
  delete cloc.header
  delete cloc.SUM

  cloc = Object.keys(cloc).reduce((cleanCloc, path) => {
    // remove root/ at beginning of filepath
    const cleanPath = path.replace('root/', '')
    cleanCloc[cleanPath] = cloc[path]

    // replace code key with size
    cleanCloc[cleanPath].size = cleanCloc[cleanPath].code
    delete cleanCloc[cleanPath].code

    return cleanCloc
  }, {})

  writeJson(cleanClocFile, cloc)

  return cloc
}

async function getCleanIgnored(repoId) {
  const file = config.paths.repo(repoId, config.cloc.ignoredFile)
  const files = await readJson(file)
  return files.filter((f) => f.file !== 'root')
}

async function getCleanClocData(repoId) {
  const [ cloc, ignored ] = await Promise.all([
    getCleanCloc(repoId),
    getCleanIgnored(repoId),
  ])

  return { cloc, ignored }
}

module.exports = getCleanClocData
