import { useMemo } from 'react'
import { useMainTheme, useVisStyles } from 'store/selectors'
import { colorString } from 'services/utils'
import { darkBaseTheme, getPalette } from './utils'

export default function useCreateTheme() {
  const { fontSize, sidebarBackgroundColor } = useMainTheme()
  const { fill: mainBackgroundColor } = useVisStyles().background

  const baseTheme = useMemo(() => ({
    ...darkBaseTheme,
    typography: {
      ...darkBaseTheme.typography,
      fontSize,
    },
  }),  [fontSize])

  const main = useMemo(() => {
    const backgroundColor = colorString(mainBackgroundColor)
    const palette = getPalette(backgroundColor)
    palette.background.default = backgroundColor
    return { ...baseTheme, palette }
  }, [baseTheme, mainBackgroundColor])

  const sidebar = useMemo(() => {
    const backgroundColor = colorString(sidebarBackgroundColor)
    const palette = getPalette(backgroundColor)
    palette.background.paper = backgroundColor // TODO change to default
    palette.background.default = 'hsl(0, 0%, 14%)' // TODO should change depending on backgroundColor
    return { ...baseTheme, palette }
  }, [baseTheme, sidebarBackgroundColor])

  return {
    main,
    sidebar,
    modals: baseTheme,
  }
}
