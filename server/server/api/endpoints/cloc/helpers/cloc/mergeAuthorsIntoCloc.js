function mergeAuthorsIntoCloc(cloc, authors, onUpdate) {
  onUpdate('\nMerging authors into cloc')

  return Object.keys(cloc).reduce((merged, path) => {
    merged[path] = {
      ...cloc[path],
      authorIds: authors
        .filter((author) => author.files.includes(path))
        .map((author) => author.id),
    }
    return merged
  }, {})
}

module.exports = mergeAuthorsIntoCloc
