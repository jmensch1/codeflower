import React, { useMemo } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useMainTheme } from 'store/selectors'
import CssBaseline from '@material-ui/core/CssBaseline'

const MainThemeProvider = ({ children }) => {
  const mainTheme = useMainTheme()

  const theme = useMemo(
    () => createMuiTheme(mainTheme),
    [mainTheme]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default MainThemeProvider
