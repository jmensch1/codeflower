const fs = require('fs')
const config = require('@config')
const mixpanel = require('@util/mixpanel')
const hljs = require('highlight.js')
const { readJson } = require('@util/files')

module.exports = async ({ repoId, path, highlight = true }) => {
  if (!repoId || !path) throw config.errors.BadFileRequest

  const mergedFile = config.paths.repo(repoId, 'cloc-and-ignored.json')
  const mergedCloc = await readJson(mergedFile)
  const cloc = mergedCloc[path]

  const absPath = config.paths.repo(repoId, 'root', path)

  try {
    let fileContent = await fs.promises.readFile(absPath, 'utf-8')
    let highlightedContent = null

    const clocLanguageRecognized = !!hljs.getLanguage(cloc.language)

    if (highlight) {
      highlightedContent = clocLanguageRecognized
        ? hljs.highlight(cloc.language, fileContent)
        : hljs.highlightAuto(fileContent)
    }

    const data = {
      isHighlighted: highlight,
      cloc,
      clocLanguageRecognized,
      highlightLanguage: highlightedContent ? highlightedContent.language : null,
      content: highlightedContent ? highlightedContent.value : fileContent,
    }

    mixpanel.track('file_success', {
      distinct_id: 'user',
      repoId,
      path,
    })

    return data
  } catch(err) {
    if (err.code === 'ENOENT') throw config.errors.FileNotFound
    else throw err
  }
}
