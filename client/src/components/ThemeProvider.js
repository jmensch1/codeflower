import React, { useMemo } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useSettings } from 'store/selectors'
import CssBaseline from '@material-ui/core/CssBaseline'
import mainThemes from 'themes/mainThemes'

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
