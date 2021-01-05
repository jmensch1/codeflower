import React, { useMemo, useCallback } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import visThemes from 'themes/visThemes'
import { useSettings, useLanguageColors, useSelectedLanguage } from 'store/selectors'

const VisThemeProvider = ({ children, langClasses }) => {
  const { visThemeId } = useSettings()
  const selectedLanguage = useSelectedLanguage()
  const langColors = useLanguageColors()

  const visTheme = visThemes[visThemeId]

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

  const theme = useCallback((mainTheme) => (
    createMuiTheme({
      ...mainTheme,
      visualization: visTheme.visualization,
      languages: langStyles,
    })
  ), [visTheme, langStyles])

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default VisThemeProvider
