const fs = require('fs')
const config = require('@config')
const mixpanel = require('@util/mixpanel')
const hljs = require('highlight.js')
const { readJson } = require('@util/files')

module.exports = async ({ repoId, path }) => {
  if (!repoId || !path) throw config.errors.BadFileRequest

  let cloc, fileContent
  try {
    // get cloc data for file
    const mergedFile = config.paths.repo(repoId, 'cloc-and-ignored.json')
    const mergedCloc = await readJson(mergedFile)
    cloc = mergedCloc[path]

    // get file content
    const absPath = config.paths.repo(repoId, 'root', path)
    content = await fs.promises.readFile(absPath, 'utf-8')
  } catch(err) {
    if (err.code === 'ENOENT') throw config.errors.FileNotFound
    else throw err
  }

  let clocLanguageRecognized, isHighlighted, highlightLanguage
  try {
    // highlight content
    clocLanguageRecognized = !!hljs.getLanguage(cloc.language)
    const highlight = clocLanguageRecognized
      ? hljs.highlight(cloc.language, content)
      : hljs.highlightAuto(content)

    // if highlight successful
    isHighlighted = true
    highlightLanguage = highlight.language
    content = highlight.value
  } catch(err) {
    isHighlighted = false
    highlightLanguage = null
  }

  mixpanel.track('file_success', {
    distinct_id: 'user',
    repoId,
    path,
  })

  return {
    cloc,
    clocLanguageRecognized,
    isHighlighted,
    highlightLanguage,
    content,
  }
}
