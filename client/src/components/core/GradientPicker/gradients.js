import {
  hueGradient,
  alphaGradient,
  lightnessGradient,
  checkerGradient,
  getLightness,
} from 'services/utils'

export const hueAlpha = ({ saturation, lightness, backgroundColor }) =>
  [
    checkerGradient({
      alpha: 0.008,
      backgroundColor,
    }),
    alphaGradient({
      saturation: 0,
      lightness: getLightness(backgroundColor),
      direction: 'bottom',
    }),
    hueGradient({
      saturation,
      lightness,
    }),
  ].join(',')

export const lightnessHue = ({ hueRange, saturation, alpha }) =>
  [
    lightnessGradient(),
    hueGradient({
      hueRange,
      saturation,
      alpha,
      direction: 'bottom',
    }),
  ].join(',')

export const saturationHue = ({ hueRange, lightness, alpha }) =>
  [
    alphaGradient({
      lightness,
      saturation: 0,
      direction: 'left',
    }),
    hueGradient({
      hueRange,
      lightness,
      alpha,
      direction: 'bottom',
    }),
  ].join(',')
