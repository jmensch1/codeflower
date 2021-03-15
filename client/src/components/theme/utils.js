import { createMuiTheme } from '@material-ui/core/styles'

export const palettes = {
  dark: createMuiTheme({ palette: { type: 'dark' } }).palette,
  light: createMuiTheme({ palette: { type: 'light' } }).palette,
}

export function paletteType(backgroundColor) {
  return backgroundColor.lightness > 50 ? 'light' : 'dark'
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
