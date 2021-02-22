function getChildren(tree, path) {
  return Object.keys(tree)
    .map((name) => {
      if (tree[name].language || tree[name].languageUnknown)
        return {
          name,
          ...tree[name],
        }
      else
        return {
          name,
          path: `${path}/${name}`,
          children: getChildren(tree[name], `${path}/${name}`),
        }
    })
    .sort((a, b) => {
      if (a.children && !b.children) return -1
      if (!a.children && b.children) return 1
      return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    })
}

function clocToTree(cloc, onUpdate) {
  onUpdate('\nConverting cloc to tree')

  const root = {}

  Object.keys(cloc).forEach((path) => {
    const sections = path.split('/')
    const folders = sections.slice(0, -1)
    const file = sections.slice(-1)
    let cur = root
    folders.forEach((folder) => {
      if (!cur[folder]) cur[folder] = {}
      cur = cur[folder]
    })
    cur[file] = cloc[path]
    cur[file].path = `root/${path}`
  })

  return {
    name: 'root',
    path: 'root',
    children: getChildren(root, 'root'),
  }
}

module.exports = clocToTree
