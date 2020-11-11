import React, { useState, useEffect } from 'react'
import { ThemeProvider as JSSThemeProvider } from 'react-jss'
import themes from 'themes'
import { useThemeId, useLanguages, useSelectedLanguage } from 'store/selectors'

const ThemeProvider = ({ children }) => {
  const themeId = useThemeId()
  const languages = useLanguages()
  const selectedLanguage = useSelectedLanguage()
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    let theme = themes[themeId]

    if (languages) {
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

      theme = {
        themeName: 'test',
        ...theme,
        visualization: {
          ...theme.visualization,
          default: {
            ...theme.visualization.default,
            ...styles,
          }
        }
      }
    }

    setTheme(theme)
  }, [themeId, languages, selectedLanguage])

  if (!theme) return null
  return (
    <JSSThemeProvider theme={theme}>
      { children }
    </JSSThemeProvider>
  )
}

export default ThemeProvider
