import { createMuiTheme } from '@material-ui/core/styles'
import tinyColor from 'tinycolor2'
import { colorString } from 'services/utils'

export const palettes = {
  dark: createMuiTheme({ palette: { type: 'dark' } }).palette,
  light: createMuiTheme({ palette: { type: 'light' } }).palette,
}

// adapted from https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
// TODO: apply this to the checker gradient in services/utils/color
export function paletteType(backgroundColor) {
  const { r, g, b } = tinyColor(colorString(backgroundColor)).toRgb()
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? 'light' : 'dark'
}

export function darken(color, by) {
  return {
    ...color,
    lightness: Math.max(0, color.lightness - by),
  }
}

export function lighten(color, by) {
  return {
    ...color,
    lightness: Math.min(100, color.lightness + by),
  }
}
