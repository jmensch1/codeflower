import React, { useMemo } from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles'
import { useSettings } from 'store/selectors'
import CssBaseline from '@material-ui/core/CssBaseline'

const ThemeProvider = ({ children }) => {
  const { mainThemeId } = useSettings()

  const theme = useMemo(() => {
    return createMuiTheme({
      palette: {
        type: mainThemeId,
        background: {
          default: '#232323',
          paper: '#363636',
        },
      },
    })
  }, [mainThemeId])

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
