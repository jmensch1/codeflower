import React, { useCallback } from 'react'
import Slider from 'components/core/Slider'
import { grayscaleGradient, toFixed0 } from 'services/utils'

const LIGHTNESS_RANGE = [0, 100]
const BACKGROUND = grayscaleGradient()

const LightnessSlider = ({ color, onChange, ...rest }) => {
  const handleChange = useCallback((lightness) => {
    onChange({
      hue: 0,
      saturation: 0,
      lightness,
      alpha: 1,
    })
  }, [onChange])

  return (
    <Slider
      range={LIGHTNESS_RANGE}
      value={color.lightness}
      onChange={handleChange}
      background={BACKGROUND}
      renderValue={toFixed0}
      { ...rest }
    />
  )
}

export default LightnessSlider
