import React, { useMemo } from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'
import themes from 'themes'
import { useSettings, useLanguages } from 'store/selectors'
import CssBaseline from '@material-ui/core/CssBaseline'

const ThemeProvider = ({ children }) => {
  const { visThemeId, mainThemeId } = useSettings()
  const { classes, selectedLanguage } = useLanguages()

  const theme = useMemo(() => {
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

    return createMuiTheme({
      palette: {
        type: mainThemeId,
        background: {
          default: '#232323',
          paper: '#363636',
        },
      },
      visualization: visTheme.visualization,
      languages: languageStyles,
    })
  }, [mainThemeId, visThemeId, classes, selectedLanguage])

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
