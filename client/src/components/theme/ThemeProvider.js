import React from 'react'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import useCreateTheme from './useCreateTheme'
import CssBaseline from '@material-ui/core/CssBaseline'

const ThemeProvider = ({ type, children }) => {
  const themes = useCreateTheme()

  return (
    <MuiThemeProvider theme={themes[type]}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
