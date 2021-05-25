import React, { useMemo } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import baseTheme from 'themes/baseTheme'

const RootThemeProvider = ({ children }) => {
  const theme = useMemo(() => createMuiTheme(baseTheme), [])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default RootThemeProvider
