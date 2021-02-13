function getChildren(tree, path) {
  return Object.keys(tree)
    .map((name) => {
      if (tree[name].language)
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
    .sort((a, b) => (b.name > a.name ? 1 : -1))
}

function clocToTree(cloc) {
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
