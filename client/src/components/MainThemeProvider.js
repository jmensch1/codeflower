import React, { useMemo, useState } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useMainTheme } from 'store/selectors'
import CssBaseline from '@material-ui/core/CssBaseline'
import Portal from 'components/core/Portal'
import Palette from './Palette'

const MainThemeProvider = ({ children }) => {
  const mainTheme = useMainTheme()
  const [palette, setPalette] = useState(mainTheme.palette)

  const theme = useMemo(
    () => createMuiTheme({
      ...mainTheme,
      palette,
    }),
    [mainTheme, palette]
  )

  return (
    <ThemeProvider theme={theme}>
      <Portal domElementId='palette-controls'>
        <Palette palette={palette} onChange={setPalette} />
      </Portal>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default MainThemeProvider
