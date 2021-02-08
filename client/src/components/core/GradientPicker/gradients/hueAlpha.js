import tinycolor from 'tinycolor2'
import { hueGradient, alphaGradient, checkerGradient } from 'services/utils'

const hueAlpha = ({
  hueRange = [0, 360],
  alphaRange = [1, 0],
  saturation = 0,
  lightness = 0,
  backgroundColor = 'hsla(0, 0%, 0%, 1.0)',
}) => [
  checkerGradient({
    alpha: 0.008,
    backgroundColor,
  }),
  alphaGradient({
    alphaMin: alphaRange[0],
    alphaMax: alphaRange[1],
    saturation: 0,
    lightness: tinycolor(backgroundColor).toHsl().l * 100,
    direction: 'bottom',
  }),
  hueGradient({
    hueMin: hueRange[0],
    hueMax: hueRange[1],
    saturation,
    lightness,
    alpha: 1.0,
    steps: 20,
  }),
].join(',')


export default hueAlpha
