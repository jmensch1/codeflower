import React, { useCallback } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import themes from 'themes'
import { useSettings, useSelectedLanguage } from 'store/selectors'

const VisThemeProvider = ({ children, langClasses }) => {
  const { visThemeId } = useSettings()
  const selectedLanguage = useSelectedLanguage()

  const theme = useCallback((mainTheme) => {
    const visTheme = themes[visThemeId]

    const languageStyles = (() => {
      if (!langClasses) return null

      const languages = Object.keys(langClasses)
      const styles = languages.reduce((styles, lang, index) => {
        const color = visTheme.languages.color(languages, index)
        styles[`& .${langClasses[lang]}`] = { fill: color }
        return styles
      }, {})

      if (selectedLanguage) {
        const langClass = langClasses[selectedLanguage]
        styles[`& .file.${langClass}`] = visTheme.languages.highlight()
        styles[`& .file:not(.${langClass})`] = visTheme.languages.suppress()
      }

      return styles
    })()

    return createMuiTheme({
      ...mainTheme,
      visualization: visTheme.visualization,
      languages: languageStyles,
    })
  }, [visThemeId, langClasses, selectedLanguage])

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default VisThemeProvider
