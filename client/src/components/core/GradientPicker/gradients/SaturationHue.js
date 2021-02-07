import React from 'react'
import { hueGradient, checkerGradient } from 'services/utils'
import Background from 'components/core/Background'

const saturationGradient = ({ alpha }) => {
  return `
    linear-gradient(
      90deg,
        hsla(0,0%,50%,${alpha}),
        hsla(0,0%,50%,0)
    )
  `
}

const SaturationHue = ({
  saturationRange = [0, 100],
  hueRange = [0, 360],
  lightness = 0,
  alpha = 1.0,
  backgroundColor = 'hsla(0, 0%, 0%, 1.0)',
}) => (
  <Background layers={[
    checkerGradient({
      alpha: 0.008,
      backgroundColor,
    }),
    saturationGradient({
      alpha,
    }),
    hueGradient({
      hueMin: hueRange[0],
      hueMax: hueRange[1],
      saturation: 100,
      lightness,
      alpha,
      steps: 20,
      direction: 'bottom',
    }),
  ]} />
)

export default SaturationHue
