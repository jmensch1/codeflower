import React, { useMemo, useCallback } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {
  useVisTheme,
  useLanguageColors,
  useSelectedLanguage,
  useFolderPaths,
  useHighlightedFolderPath,
  useHighlightedAuthorId,
} from 'store/selectors'

const VisThemeProvider = ({ children, langClasses, folderClasses }) => {
  const visTheme = useVisTheme()
  const langColors = useLanguageColors()
  const selectedLanguage = useSelectedLanguage()
  const highlightedFolderPath = useHighlightedFolderPath()
  const folderPaths = useFolderPaths()
  const highlightedAuthorId = useHighlightedAuthorId()

  const langStyles = useMemo(() => {
    const languages = Object.keys(langClasses)

    const styles = languages.reduce((styles, lang, index) => {
      const color = langColors[lang]
      styles[`& .${langClasses[lang]}`] = { fill: color }
      return styles
    }, {})

    if (selectedLanguage) {
      const langClass = langClasses[selectedLanguage]
      styles[`& .file.${langClass}`] = visTheme.languages.highlight()
      styles[`& .file:not(.${langClass})`] = visTheme.languages.suppress()
    }

    return styles
  }, [visTheme, langClasses, langColors, selectedLanguage])

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

  const userStyles = useMemo(() => {
    const styles = {}
    if (highlightedAuthorId)
      styles[`& .file:not(.user-${highlightedAuthorId})`] = { display: 'none' }
    return styles
  }, [highlightedAuthorId])

  const theme = useCallback(
    (mainTheme) =>
      createMuiTheme({
        ...mainTheme,
        visualization: visTheme.visualization,
        languages: langStyles,
        folders: folderStyles,
        users: userStyles,
      }),
    [visTheme, langStyles, folderStyles, userStyles]
  )

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default VisThemeProvider
