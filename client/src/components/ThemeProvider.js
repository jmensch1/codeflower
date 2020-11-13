import React, { useState, useEffect } from 'react'
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import themes from 'themes'
import { useSettings, useLanguages } from 'store/selectors'
import CssBaseline from '@material-ui/core/CssBaseline'

const ThemeProvider = ({ children }) => {
  const { visThemeId, mainThemeId } = useSettings()
  const { classes, selectedLanguage } = useLanguages()
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    const theme = themes[visThemeId]

    const languageStyles = (() => {
      if (!classes) return null

      const languages = Object.keys(classes)
      const styles = languages.reduce((styles, lang, index) => {
        const color = theme.dynamic.nodeColor(languages, index)
        styles[`& .${classes[lang]}`] = {
          fill: color,
          'background-color': color,
        }
        return styles
      }, {})

      if (selectedLanguage) {
        const langClass = classes[selectedLanguage]
        styles[`& .file.${langClass}`] = theme.dynamic.highlightNode()
        styles[`& .file:not(.${langClass})`] = theme.dynamic.suppressNode()
      }

      return styles
    })()

    setTheme(createMuiTheme({
      palette: { type: mainThemeId },
      languages: languageStyles,
      ...theme,
    }))
  }, [mainThemeId, visThemeId, classes, selectedLanguage])

  if (!theme) return null
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      { children }
    </MuiThemeProvider>
  )
}

export default ThemeProvider
