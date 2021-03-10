import { useMemo } from 'react'
import { useMainTheme, useVisStyles } from 'store/selectors'
import { createMuiTheme } from '@material-ui/core/styles'
import { getLightness, colorString } from 'services/utils'

export default function useCreateTheme() {
  // adjust accessors after rearranging state
  const mainTheme = useMainTheme()
  const { fontSize } = mainTheme.typography
  const { paper: sidebarBackground
  } = mainTheme.palette.background
  const { fill: mainBackground } = useVisStyles().background

  const baseTheme = useMemo(() => {
    return createMuiTheme({
      palette: { type: 'dark' },
      typography: { fontSize } ,
    })
  },  [fontSize])

  const main = useMemo(() => {
    const backgroundColor = colorString(mainBackground)

    const { palette } = createMuiTheme({
      palette: {
        type: getLightness(backgroundColor) > 50 ? 'light' : 'dark',
        background: {
          default: backgroundColor,
        },
      },
    })

    return { ...baseTheme, palette }
  }, [baseTheme, mainBackground])

  const sidebar = useMemo(() => {
    // TODO: will need to use colorString when stored as object in mainTheme
    const backgroundColor = sidebarBackground

    const { palette } = createMuiTheme({
      palette: {
        type: getLightness(backgroundColor) > 50 ? 'light' : 'dark',
        background: {
          paper: backgroundColor,  // TODO change to default
          default: 'hsl(0, 0%, 14%)',  // TODO should change depending on backgroundColor
        },
      },
    })

    return { ...baseTheme, palette }
  }, [baseTheme, sidebarBackground])

  return {
    main,
    sidebar,
    modals: baseTheme,
  }
}
