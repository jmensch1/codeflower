function mergeUsersIntoCloc(cloc, users) {
  return Object.keys(cloc).reduce((merged, path) => {
    merged[path] = {
      ...cloc[path],
      users: users
        .filter((user) => user.files.includes(path))
        .map((user) => user.id)
    }
    return merged
  }, {})
}

module.exports = mergeUsersIntoCloc
