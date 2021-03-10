import { createMuiTheme } from '@material-ui/core/styles'
import { getLightness } from 'services/utils'

const darkBaseTheme = createMuiTheme({ palette: { type: 'dark' }})
const lightBaseTheme = createMuiTheme({ palette: { type: 'light' }})

const darkPalette = darkBaseTheme.palette
const lightPalette = lightBaseTheme.palette

export function getPalette(backgroundColor) {
  return getLightness(backgroundColor) > 50 ? lightPalette : darkPalette
}
