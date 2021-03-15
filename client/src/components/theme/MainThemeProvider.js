import React, { useMemo } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { colorString } from 'services/utils'
import { paletteType, palettes } from './utils'
import { useVisStyles } from 'store/selectors'

const MainThemeProvider = ({ children }) => {
  const { fill: bgColor } = useVisStyles().background

  const theme = useMemo(() => {
    const type = paletteType(bgColor)
    const base = palettes[type]

    const palette = {
      ...base,
      background: {
        ...base.background,
        default: colorString(bgColor),
      },
    }

    return (outerTheme) => ({ ...outerTheme, palette })
  }, [bgColor])

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MainThemeProvider
