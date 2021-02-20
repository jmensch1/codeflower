const fs = require('fs')
const config = require('@config')
const mixpanel = require('@util/mixpanel')
const hljs = require('highlight.js')
const { readJson } = require('@util/files')

function applyHighlighting(file, cloc) {
  const out = {
    isHighlighted: false,
    highlightLanguage: null,
    cloc,
    clocLanguageRecognized: false,
    content: file,
  }

  // don't apply highlighting if cloc did not determine a language
  if (!cloc.language) return out

  try {
    // highlight content
    const languageRecognized = !!hljs.getLanguage(cloc.language)
    const highlight = languageRecognized
      ? hljs.highlight(cloc.language, file)
      : hljs.highlightAuto(file)

    out.isHighlighted = true
    out.highlightLanguage = highlight.language
    out.clocLanguageRecognized = languageRecognized
    out.content = highlight.value
  } catch (err) {}

  return out
}

module.exports = async ({ repoId, path }) => {
  if (!repoId || !path) throw config.errors.BadFileRequest

  try {
    // get file content
    const absPath = config.paths.repo(repoId, 'root', path)
    var file = await fs.promises.readFile(absPath, 'utf-8')

    // get cloc data for file
    const mergedFile = config.paths.repo(repoId, 'cloc-and-ignored.json')
    const mergedCloc = await readJson(mergedFile)
    var cloc = mergedCloc[path]
  } catch (err) {
    if (err.code === 'ENOENT') throw config.errors.FileNotFound
    else throw err
  }

  const out = applyHighlighting(file, cloc)

  mixpanel.track('file_success', {
    distinct_id: 'user',
    repoId,
    path,
  })

  return out
}
