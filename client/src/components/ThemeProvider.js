import React from 'react'
import { ThemeProvider as JSSThemeProvider } from 'react-jss'
import themes from 'themes'
import { useThemeId } from 'store/selectors'

const ThemeProvider = ({ children }) => {
  const themeId = useThemeId()
  const theme = themes[themeId]

  return (
    <JSSThemeProvider theme={theme}>
      { children }
    </JSSThemeProvider>
  )
}

export default ThemeProvider
