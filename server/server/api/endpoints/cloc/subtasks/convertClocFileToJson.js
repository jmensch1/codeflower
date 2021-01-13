////////////////// IMPORTS /////////////////////

const { readJson, writeJson } = require('@util/files')
const config = require('@config')

///////// GET TREE FROM CLOC OUTPUT //////////

/**
 * Convert a simple json object into another specifying children as an array
 * Works recursively
 *
 * example input:
 * { a: { b: { c: { size: 12 }, d: { size: 34 } }, e: { size: 56 } } }
 * example output
 * { name: a, children: [
 *   { name: b, children: [
 *     { name: c, size: 12 },
 *     { name: d, size: 34 }
 *   ] },
 *   { name: e, size: 56 }
 * ] } }
 */

function getChildren(json) {
  var children = []
  if (json.language) return children
  for (var key in json) {
    var child = { name: key }
    if (typeof json[key].size !== 'undefined') {
      // value node
      child.size = json[key].size;
      child.language = json[key].language;
      child.blank = json[key].blank;
      child.comment = json[key].comment;
      child.users = json[key].users;
    } else {
      // children node
      var childChildren = getChildren(json[key])
      if (childChildren) child.children = childChildren
    }
    children.push(child)
    delete json[key]
  }
  children.sort((a, b) => b.name > a.name ? 1 : -1)
  return children
}

function clocToTree(clocData) {
  var json = {}
  Object.keys(clocData).forEach((key) => {
    var filename = key
    if (!filename) return
    var elements = filename.split(/[\/\\]/)
    var current = json
    elements.forEach(function (element) {
      if (!current[element]) {
        current[element] = {}
      }
      current = current[element]
    })
    const file = clocData[key]
    current.language = file.language;
    current.size = file.code;
    current.blank = file.blank;
    current.comment = file.comment;
    current.users = file.users
  })
  return getChildren(json)[0]
}

function getTree(repoId, users) {
  const repoDir = config.paths.repo(repoId)
  const file = `${repoDir}/${config.cloc.dataFile}`
  return readJson(file)
    .then((clocData) => {
      // clean cloc data
      delete clocData.header
      delete clocData.SUM
      return clocData
    })
    .then((clocData) => {
      // merge in users
      Object.keys(clocData).forEach(fileName => {
        const file = clocData[fileName]
        file.users = []
        users.forEach(user => {
          if (user.files.includes(fileName.replace('root/', '')))
            file.users.push(user.id)
        })
      })

      // delete file lists for users
      users.forEach(user => {
        delete user.files
      })

      return clocData
    })
    .then(clocToTree)
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
