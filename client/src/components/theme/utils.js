import { createMuiTheme } from '@material-ui/core/styles'
import { getLightness } from 'services/utils'

export const darkBaseTheme = createMuiTheme({ palette: { type: 'dark' }})
export const lightBaseTheme = createMuiTheme({ palette: { type: 'light' }})

export const darkPalette = darkBaseTheme.palette
export const lightPalette = lightBaseTheme.palette

export function getPalette(backgroundColor) {
  return getLightness(backgroundColor) > 50 ? lightPalette : darkPalette
}
