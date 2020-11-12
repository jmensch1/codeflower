import React, { useState, useEffect } from 'react'
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import themes from 'themes'
import { useSettings, useLanguages, useSelectedLanguage } from 'store/selectors'
import CssBaseline from '@material-ui/core/CssBaseline'

const ThemeProvider = ({ children }) => {
  const { visThemeId, mainThemeId } = useSettings()
  const languages = useLanguages()
  const selectedLanguage = useSelectedLanguage()
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    const theme = themes[visThemeId]

    const languageStyles = (() => {
      if (!languages) return null

      const styles = languages.reduce((styles, lang, index) => {
        const color = theme.dynamic.nodeColor(languages, index)
        styles[`& .${lang.class}`] = {
          fill: color,
          'background-color': color,
        }
        return styles
      }, {})

      if (selectedLanguage) {
        styles[`& .file.${selectedLanguage}`] = theme.dynamic.highlightNode()
        styles[`& .file:not(.${selectedLanguage})`] = theme.dynamic.suppressNode()
      }

      return styles
    })()

    setTheme(createMuiTheme({
      palette: { type: mainThemeId },
      languages: languageStyles,
      ...theme,
    }))
  }, [mainThemeId, visThemeId, languages, selectedLanguage])

  if (!theme) return null
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      { children }
    </MuiThemeProvider>
  )
}

export default ThemeProvider
