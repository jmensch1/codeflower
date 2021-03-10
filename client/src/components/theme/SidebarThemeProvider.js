import React, { useMemo } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { colorString } from 'services/utils'
import { getPalette } from './utils'
import { useMainTheme } from 'store/selectors'

const SidebarThemeProvider = ({ children }) => {
  const { sidebarBackgroundColor } = useMainTheme()

  const theme = useMemo(() => {
    const backgroundColor = colorString(sidebarBackgroundColor)
    const palette = getPalette(backgroundColor)
    palette.background.paper = backgroundColor // TODO change to default
    palette.background.default = 'hsl(0, 0%, 14%)' // TODO should change depending on backgroundColor
    return (outerTheme) => ({ ...outerTheme, palette })
  }, [sidebarBackgroundColor])

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default SidebarThemeProvider
