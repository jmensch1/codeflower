import React from 'react'
import { hueGradient, checkerGradient } from 'services/utils'
import Background from 'components/core/Background'

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

const LightnessHue = ({
  lightnessRange = [0, 100],
  hueRange = [0, 360],
  saturation = 0,
  alpha = 1.0,
  backgroundColor = 'hsla(0, 0%, 0%, 1.0)',
}) => (
  <Background layers={[
    checkerGradient({
      alpha: 0.008,
      backgroundColor,
    }),
    lightnessGradient({
      alpha,
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
  ]} />
)

export default LightnessHue
