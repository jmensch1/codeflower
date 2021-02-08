import { alphaGradient } from 'services/utils'

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
    `hsla(${hue}, 100%, 50%, 1.0)`,
  ].join(',')

export default saturationLightness
