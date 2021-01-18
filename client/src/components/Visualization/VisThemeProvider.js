import React, { useMemo, useCallback } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {
  useVisTheme,
  useLanguageColors,
  useLanguageIds,
  useFolderIds,
  useSelectedLanguage,
  useHighlightedFolderPath,
  useHighlightedAuthorId,
} from 'store/selectors'
import { partition, multiClassSelector as select } from 'services/utils'

const VisThemeProvider = ({ children }) => {
  const visTheme = useVisTheme()
  const languageColors = useLanguageColors()
  const selectedLanguage = useSelectedLanguage()
  const highlightedFolderPath = useHighlightedFolderPath()
  const highlightedAuthorId = useHighlightedAuthorId()
  const languageIds = useLanguageIds()
  const folderIds = useFolderIds()

  const langStyles = useMemo(() => {
    const languages = Object.keys(languageIds)

    const styles = languages.reduce((styles, lang) => {
      const color = languageColors[lang]
      const clx = `lang-${languageIds[lang]}`
      styles[`& .${clx}`] = { fill: color }
      return styles
    }, {})

    if (selectedLanguage) {
      const clx = `lang-${languageIds[selectedLanguage]}`
      styles[`& .file.${clx}`] = visTheme.files.highlighted
      styles[`& .file:not(.${clx})`] = visTheme.files.suppressed
      styles[`& .folder`] = visTheme.folders.suppressed
      styles[`& .link`] = visTheme.links.suppressed
    }

    return styles
  }, [visTheme, languageIds, languageColors, selectedLanguage])

  const folderStyles = useMemo(() => {
    if (!highlightedFolderPath) return {}

    const styles = {}

    const folderPaths = Object.keys(folderIds)
    const { files, folders, links } = visTheme

    const [highlightedIds, suppressedIds] = partition(
      folderPaths,
      (path) => path.startsWith(highlightedFolderPath),
      (path) => folderIds[path]
    )

    styles[select('& .file.folder-', highlightedIds)] = files.highlighted
    styles[select('& .folder.folder-', highlightedIds)] = folders.highlighted
    styles[select('& .link.folder-', highlightedIds)] = links.highlighted

    styles[select('& .file.folder-', suppressedIds)] = files.suppressed
    styles[select('& .folder.folder-', suppressedIds)] = folders.suppressed
    styles[select('& .link.folder-', suppressedIds)] = links.suppressed

    // highlight the highlighted folder
    // styles[`& .folder.folder-${folderIds[highlightedFolderPath]}`] = {
    //   fill: 'white',
    //   r: '10',
    // }

    return styles
  }, [visTheme, folderIds, highlightedFolderPath])

  const authorStyles = useMemo(() => {
    const styles = {}

    if (highlightedAuthorId !== null) {
      const clx = `author-${highlightedAuthorId}`
      styles[`& .file.${clx}`] = visTheme.files.highlighted
      styles[`& .file:not(.${clx})`] = visTheme.files.suppressed
      styles[`& .folder`] = visTheme.folders.suppressed
      styles[`& .link`] = visTheme.links.suppressed
    }

    return styles
  }, [visTheme, highlightedAuthorId])

  const theme = useCallback(
    (mainTheme) => {
      return createMuiTheme({
        ...mainTheme,
        visualization: visTheme.visualization,
        dynamic: {
          ...langStyles,
          ...folderStyles,
          ...authorStyles,
        },
      })
    },
    [visTheme, langStyles, folderStyles, authorStyles]
  )

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default VisThemeProvider
