import React, { useMemo, useCallback } from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'
import themes from 'themes'
import { useSettings, useLanguages, useSelectedLanguage } from 'store/selectors'

const ThemeProvider = ({ children }) => {
  const { visThemeId } = useSettings()
  const { counts } = useLanguages()
  const selectedLanguage = useSelectedLanguage()

  const classes = useMemo(() => {
    if (!counts) return null

    return counts.reduce((classes, count, index) => {
      classes[count.language] = `lang-${index}`
      return classes
    }, {})
  }, [counts])

  const theme = useCallback((mainTheme) => {
    const visTheme = themes[visThemeId]

    const languageStyles = (() => {
      if (!classes) return null

      const languages = Object.keys(classes)
      const styles = languages.reduce((styles, lang, index) => {
        const color = visTheme.languages.color(languages, index)
        styles[`& .${classes[lang]}`] = {
          fill: color,
          'background-color': color,
        }
        return styles
      }, {})

      if (selectedLanguage) {
        const langClass = classes[selectedLanguage]
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
  }, [visThemeId, classes, selectedLanguage])

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
