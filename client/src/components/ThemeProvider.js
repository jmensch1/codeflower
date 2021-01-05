import React, { useMemo } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useSettings } from 'store/selectors'
import CssBaseline from '@material-ui/core/CssBaseline'

const mainThemes = {
  dark: {
    palette: {
      type: 'dark',
      background: {
        default: '#232323',
        paper: '#363636',
      },
    },
  },
  light: {
    palette: {
      type: 'light',
    },
  },
}

const MainThemeProvider = ({ children }) => {
  const { mainThemeId } = useSettings()

  const theme = useMemo(() => {
    return createMuiTheme(mainThemes[mainThemeId])
  }, [mainThemeId])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default MainThemeProvider
