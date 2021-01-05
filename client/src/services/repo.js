// returns an array of all the paths in the given repo
function getFolderPaths(root) {
  const folderPaths = []

  // generate path strings and totalNode counts
  ;(function recurse(folder, folderPath) {
    if (folder.children) {
      folderPath += folder.name + '/'

      const total = folder.children.reduce((prev, cur) => {
        return prev + recurse(cur, folderPath)
      }, 1)

      folderPaths.unshift({
        pathName: folderPath,
        totalNodes: total,
      })

      return total
    } else {
      return 1
    }
  })(root, '')

  // take off trailing slashes
  folderPaths.forEach((path) => (path.pathName = path.pathName.slice(0, -1)))

  return folderPaths
}

// return the portion of a repo object indicated by the given folderPath
function getFolder(root, folderPath) {
  let folder = root
  const props = folderPath.split('/')
  for (let i = 1; i < props.length; i++) {
    for (let j = 0; j < folder.children.length; j++) {
      if (folder.children[j].name === props[i]) {
        folder = folder.children[j]
        break
      }
    }
  }
  return folder
}

// returns the counts of languages in the given folder
function getLanguageCounts(folder) {
  if (!folder) return []

  const counts = {}

  // traverse the given folder and calculate
  // the file and line folders
  ;(function recurse(node) {
    if (node.language) {
      const { language: lang } = node

      if (!counts[lang])
        counts[lang] = {
          files: 0,
          lines: 0,
        }

      counts[lang].files += 1
      counts[lang].lines += node.size
    }

    if (node.children) node.children.forEach(recurse)
  })(folder)

  return Object.keys(counts).map((language) => ({
    ...counts[language],
    language,
  })).sort((a, b) => b.lines - a.lines)
}

const service = {
  getFolderPaths,
  getFolder,
  getLanguageCounts,
}

export default service
