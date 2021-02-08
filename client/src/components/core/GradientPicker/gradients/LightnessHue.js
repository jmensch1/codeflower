import { hueGradient } from 'services/utils'

const lightnessGradient = ({ alpha = 1.0 }) => {
  return `
    linear-gradient(
      90deg,
        hsla(0,0%,0%,${alpha}) 0%,
        hsla(0,0%,0%,0) 50%,
        hsla(0,0%,100%,0) 50%,
        hsla(0,0%,100%,${alpha}) 100%
    )
  `
}

const lightnessHue = ({
  lightnessRange = [0, 100],
  hueRange = [0, 360],
  saturation = 0,
  alpha = 1.0,
  backgroundColor = 'hsla(0, 0%, 0%, 1.0)',
}) => [
  lightnessGradient({
    alpha: 1,
  }),
  hueGradient({
    hueMin: hueRange[0],
    hueMax: hueRange[1],
    saturation,
    lightness: 50,
    alpha,
    steps: 20,
    direction: 'bottom',
  }),
].join(',')

export default lightnessHue
