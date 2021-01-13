////////////////// IMPORTS /////////////////////

const { readJson, writeJson } = require('@util/files')
const config = require('@config')

///////// GET TREE FROM CLOC OUTPUT //////////

function getChildren(tree) {
  return Object.keys(tree).map((name) => {
    if (tree[name].language)
      return {
        name,
        ...tree[name],
      }
    else
      return {
        name,
        children: getChildren(tree[name])
      }
  }).sort((a, b) => b.name > a.name ? 1 : -1)
}

function clocToTree(clocData, repoId) {
  const root = {}

  Object.keys(clocData).forEach((path) => {
    const sections = path.split('/')
    const folders = sections.slice(0, -1)
    const file = sections.slice(-1)
    let cur = root
    folders.forEach((folder) => {
      if (!cur[folder]) cur[folder] = {}
      cur = cur[folder]
    })
    cur[file] = clocData[path]
  })

  return {
    name: 'root',
    children: getChildren(root)
  }
}

function getTree(repoId, users) {
  const repoDir = config.paths.repo(repoId)
  const file = `${repoDir}/${config.cloc.dataFile}`
  return readJson(file)
    .then((clocData) => {
      // clean cloc data
      delete clocData.header
      delete clocData.SUM

      // remove root/ at beginning of filepath and
      // replace code key with size
      return Object.keys(clocData).reduce((cloc, path) => {
        const cleanPath = path.replace('root/', '')
        cloc[cleanPath] = clocData[path]
        cloc[cleanPath].size = cloc[cleanPath].code
        delete cloc[cleanPath].code
        return cloc
      }, {})
    })
    .then((clocData) => {
      // merge in users
      Object.keys(clocData).forEach(fileName => {
        const file = clocData[fileName]
        file.users = []
        users.forEach(user => {
          if (user.files.includes(fileName))
            file.users.push(user.id)
        })
      })

      // delete file lists for users
      users.forEach(user => {
        delete user.files
      })

      writeJson(`${repoDir}/clean-cloc.json`, clocData)

      return clocData
    })
    .then((clocData) => clocToTree(clocData, repoId))
    .catch(err => {
      if (err.code === 'ENOENT')
        // if cloc did not create a file (e.g., because there are no
        // code files in the repo), create dummy json
        return {
          name: 'root',
          children: [],
        }
      else throw new Error(err)
    })
}

///////// GET IGNORED FILES FROM CLOC OUTPUT //////////

function getIgnored(repoId) {
  const repoDir = config.paths.repo(repoId)
  const file = `${repoDir}/${config.cloc.ignoredFile}`
  return readJson(file)
    .then((files) => files.filter((f) => f.file !== 'root'))
}

///////////// UNITE TREE AND IGNORED FILES /////////

// converts a cloc file to json
async function convertClocFileToJson(repoId, users, onUpdate) {
  onUpdate('\nConverting cloc file to json...')

  const [tree, ignored] = await Promise.all([
    getTree(repoId, users),
    getIgnored(repoId)
  ])

  writeJson(`${config.paths.repo(repoId)}/out.json`, { tree, ignored })

  return { tree, ignored }
}

//////////// EXPORTS //////////////

module.exports = convertClocFileToJson
