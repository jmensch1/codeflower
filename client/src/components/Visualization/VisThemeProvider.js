import React, { useMemo, useCallback } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {
  useVisTheme,
  useLanguageColors,
  useLanguageIds,
  useSelectedLanguage,
  useFolderPaths,
  useHighlightedFolderPath,
  useHighlightedAuthorId,
} from 'store/selectors'

const VisThemeProvider = ({ children, folderClasses }) => {
  const visTheme = useVisTheme()
  const languageColors = useLanguageColors()
  const selectedLanguage = useSelectedLanguage()
  const highlightedFolderPath = useHighlightedFolderPath()
  const folderPaths = useFolderPaths()
  const highlightedAuthorId = useHighlightedAuthorId()
  const languageIds = useLanguageIds()

  const langStyles = useMemo(() => {
    const languages = Object.keys(languageIds)

    const styles = languages.reduce((styles, lang, index) => {
      const color = languageColors[lang]
      const clx = `lang-${languageIds[lang]}`
      styles[`& .${clx}`] = { fill: color }
      return styles
    }, {})

    if (selectedLanguage) {
      const clx = `lang-${languageIds[selectedLanguage]}`
      styles[`& .file.${clx}`] = visTheme.languages.highlight()
      styles[`& .file:not(.${clx})`] = visTheme.languages.suppress()
    }

    return styles
  }, [visTheme, languageIds, languageColors, selectedLanguage])

  const folderStyles = useMemo(() => {
    if (!highlightedFolderPath) return

    const styles = {}

    // highlight the highlighted folder
    // styles[`& .folder.${folderClasses[highlightedFolderPath]}`] = {
    //   fill: 'white',
    //   r: '10',
    // }

    // suppress everything outside the highlighted folder
    const highlightFolder = (folderPath) => {
      return folderPath.startsWith(highlightedFolderPath)
    }

    folderPaths.forEach((folderPath) => {
      const { pathName } = folderPath
      if (highlightFolder(pathName)) return

      const clx = folderClasses[pathName]
      styles[`& .folder.${clx}`] = { display: 'none' }
      styles[`& .file.${clx}`] = { display: 'none' }
      styles[`& .link.${clx}`] = { strokeOpacity: 0.2 }
    })

    return styles
  }, [folderClasses, folderPaths, highlightedFolderPath])

  const authorStyles = useMemo(() => {
    const styles = {}
    if (highlightedAuthorId)
      styles[`& .file:not(.author-${highlightedAuthorId})`] = {
        display: 'none',
      }
    return styles
  }, [highlightedAuthorId])

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
