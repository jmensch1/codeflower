import React, { useMemo, useState, useEffect } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useMainTheme } from 'store/selectors'
import CssBaseline from '@material-ui/core/CssBaseline'
import Portal from 'components/core/Portal'
import Palette from './Palette'

const MainThemeProvider = ({ children }) => {
  const mainTheme = useMainTheme()
  const [palette, setPalette] = useState(mainTheme.palette)
  const [ready, setReady] = useState(false)

  const theme = useMemo(
    () => createMuiTheme({
      ...mainTheme,
      palette,
    }),
    [mainTheme, palette]
  )

  useEffect(() => {
    setTimeout(() => {
      console.log('setting ready')
      setReady(true)
    }, 3000)
  }, [])

  // console.log('theme:', theme)

  return (
    <ThemeProvider theme={theme}>
      {ready && (
        <Portal domElementId='theme-controls'>
          <Palette palette={palette} onChange={setPalette} />
        </Portal>
      )}
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default MainThemeProvider
