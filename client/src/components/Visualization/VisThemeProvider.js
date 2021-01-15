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

    // suppress everything outside the highlighted folder
    const highlightFolder = (folderPath) => {
      return folderPath.startsWith(highlightedFolderPath)
    }

    const folderPaths = Object.keys(folderIds)

    const styles = folderPaths.reduce((styles, path) => {
      const clx = `folder-${folderIds[path]}`

      if (highlightFolder(path)) {
        styles[`& .file.${clx}`] = visTheme.files.highlighted
        styles[`& .folder.${clx}`] = visTheme.folders.highlighted
        styles[`& .link.${clx}`] = visTheme.links.highlighted
      } else {
        styles[`& .file.${clx}`] = visTheme.files.suppressed
        styles[`& .folder.${clx}`] = visTheme.folders.suppressed
        styles[`& .link.${clx}`] = visTheme.links.suppressed
      }

      return styles
    }, {})

    // highlight the highlighted folder
    // styles[`& .folder.folder-${folderIds[highlightedFolderPath]}`] = {
    //   fill: 'white',
    //   r: '10',
    // }

    return styles
  }, [visTheme, folderIds, highlightedFolderPath])

  const authorStyles = useMemo(() => {
    const styles = {}

    if (highlightedAuthorId) {
      const clx = `author-${highlightedAuthorId}`
      styles[`& .file.${clx}`] = visTheme.files.highlighted
      styles[`& .file:not(.${clx})`] = visTheme.files.suppressed
      styles[`& .folder`] = visTheme.folders.suppressed
      styles[`& .link`] = visTheme.links.suppressed
    }

    return styles
  }, [visTheme, highlightedAuthorId])

  const theme = useCallback(
    (mainTheme) =>
      createMuiTheme({
        ...mainTheme,
        visualization: visTheme.visualization,
        languages: langStyles,
        folders: folderStyles,
        authors: authorStyles,
      }),
    [visTheme, langStyles, folderStyles, authorStyles]
  )

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default VisThemeProvider
