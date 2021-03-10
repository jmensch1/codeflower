import React, { useMemo } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useMainTheme } from 'store/selectors'

const RootThemeProvider = ({ children }) => {
  const { fontSize } = useMainTheme()

  const theme = useMemo(() => createMuiTheme({
    palette: { type: 'dark' },
    typography: { fontSize },
  }), [fontSize])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default RootThemeProvider
