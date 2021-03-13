import React, { useMemo } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { colorString } from 'services/utils'
import { palettes, paletteType, lighten, darken } from './utils'
import { useBaseTheme } from 'store/selectors'

const SidebarThemeProvider = ({ children }) => {
  const { sidebarBackgroundColor: bgColor } = useBaseTheme()

  const theme = useMemo(() => {
    const type = paletteType(bgColor)
    const base = palettes[type]

    const paperColor = bgColor
    const defaultColor = type === 'light'
      ? lighten(bgColor, 7)
      : darken(bgColor, 7)

    const palette = {
      ...base,
      background: {
        ...base.background,
        paper: colorString(paperColor),
        default: colorString(defaultColor),
      }
    }

    return (outerTheme) => ({ ...outerTheme, palette })
  }, [bgColor])



  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default SidebarThemeProvider
