import React, { useMemo } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { colorString } from 'services/utils'
import { getPalette } from './utils'
import { useVisStyles } from 'store/selectors'

const MainThemeProvider = ({ children }) => {
  const { fill: mainBackgroundColor } = useVisStyles().background

  const theme = useMemo(() => {
    const backgroundColor = colorString(mainBackgroundColor)
    const palette = getPalette(backgroundColor)
    palette.background.default = backgroundColor
    return (outerTheme) => ({ ...outerTheme, palette })
  }, [mainBackgroundColor])

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default MainThemeProvider
