import React, { useMemo } from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { getLightness } from 'services/utils'

const PaletteProvider = ({ backgroundColor, children }) => {
  const theme = useMemo(() => {
    return (outerTheme) => ({
      ...outerTheme,
      palette: createMuiTheme({
        palette: {
          type: getLightness(backgroundColor) > 50 ? 'light' : 'dark',
          background: {
            default: backgroundColor,
          },
        },
      }).palette
    })
  }, [backgroundColor])

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default PaletteProvider
