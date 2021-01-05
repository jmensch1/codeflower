import React, { useCallback } from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'
import themes from 'themes'
import { useSettings, useSelectedLanguage } from 'store/selectors'

const ThemeProvider = ({ children, langClasses }) => {
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

    const theme = createMuiTheme({
      ...mainTheme,
      visualization: visTheme.visualization,
      languages: languageStyles,
    })

    return theme
  }, [visThemeId, langClasses, selectedLanguage])

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
