import { alphaGradient, colorString } from 'services/utils'

const saturationLightness = ({ hue }) =>
  [
    alphaGradient({
      saturation: 0,
      lightness: 0,
      direction: 'bottom',
    }),
    alphaGradient({
      saturation: 0,
      lightness: 100,
      direction: 'left',
    }),
    colorString({
      hue,
      saturation: 100,
      lightness: 50,
      alpha: 1,
    }),
  ].join(',')

export default saturationLightness
