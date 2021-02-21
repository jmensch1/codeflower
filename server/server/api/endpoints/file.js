const fs = require('fs')
const config = require('@config')
const mixpanel = require('@util/mixpanel')
const hljs = require('highlight.js')
const { readJson } = require('@util/files')

function getExtension(path) {
  const match = path.match(/\.([^.]*?)$/)
  return match ? match[1] : null
}

function applyHighlighting(file, clocLanguage, path) {
  const nullResult = {
    isHighlighted: false,
    content: file,
  }

  // don't highlight if cloc couldn't identify the language
  if (!clocLanguage) return nullResult

  try {
    // highlight using the cloc language if hljs recognizes it
    if (!!hljs.getLanguage(clocLanguage))
      return {
        isHighlighted: true,
        highlightLanguage: clocLanguage,
        highlightLanguageSource: 'cloc',
        content: hljs.highlight(clocLanguage, file).value,
      }

    // if not, try the file extension
    const extension = getExtension(path)
    if (!!hljs.getLanguage(extension))
      return {
        isHighlighted: true,
        highlightLanguage: extension,
        highlightLanguageSource: 'extension',
        content: hljs.highlight(extension, file).value,
      }

    // finally, let hljs auto detect the language
    const highlight = hljs.highlightAuto(file)
    return {
      isHighlighted: true,
      highlightLanguage: highlight.language,
      highlightLanguageSource: 'auto',
      content: highlight.value,
    }
  } catch (err) {
    return nullResult
  }
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

  const out = applyHighlighting(file, cloc.language, path)

  mixpanel.track('file_success', {
    distinct_id: 'user',
    repoId,
    path,
  })

  return out
}
