import React, { useCallback } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { hueGradient, interpolate } from 'services/utils'
import Pad from './Pad'
import Slider from './Slider'
import HueAlphaGradient from './gradients/HueAlpha'
import LightnessHueGradient from './gradients/LightnessHue'
import SaturationHueGradient from './gradients/SaturationHue'
import Swatches from './Swatches'

const HUE_RANGE = [0, 360]
const SATURATION_RANGE = [0, 100]
const LIGHTNESS_RANGE = [0, 100]
const ALPHA_RANGE = [1, 0]

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    border: `1px hsla(0, 0%, 100%, 0.6) solid`,
    borderRadius: 5,
    marginBottom: 30,
  },
  swatch: {
    height: 25,
    marginBottom: 10,
    background: ({ color }) => hueGradient({
      hueMin: color.hue[0],
      hueMax: color.hue[1],
      saturation: color.saturation,
      lightness: color.lightness,
      alpha: color.alpha,
    }),
  },
  heading: {
    fontSize: '0.7em',
    fontStyle: 'italic',
    opacity: 0.8,
    marginBottom: 2,
    marginTop: 10,
  },
  pad: {
    height: 200,
  },
  slider: {
    height: 25,
  },
}))

const GradientPicker = ({
  color,
  onChange
}) => {
  const theme = useTheme()
  const classes = useStyles({ color })

  const handleChange = useCallback((color) => {
    onChange(color)
  }, [onChange])

  const handleColor = `
    hsla(
      0,
      0%,
      ${interpolate(color.lightness, [75, 85], [100, 0])}%,
      1.0
    )
  `

  return (
    <div className={classes.root}>
      {/*<div className={classes.swatch} />*/}
      <Swatches color={color} />

      <div className={classes.heading}>hue/alpha</div>
      <div className={classes.pad}>
        <HueAlphaGradient
          hueRange={HUE_RANGE}
          alphaRange={ALPHA_RANGE}
          saturation={color.saturation}
          lightness={color.lightness}
          backgroundColor={theme.palette.background.default}
        >
          <Pad
            value={{ x: color.hue, y: color.alpha }}
            onChange={({ x: hue, y: alpha }) => handleChange({ ...color, hue, alpha })}
            xRange={HUE_RANGE}
            yRange={ALPHA_RANGE}
            handleColor={handleColor}
          />
        </HueAlphaGradient>
      </div>

      <div className={classes.heading}>saturation</div>
      <div className={classes.slider}>
        <SaturationHueGradient
          saturationRange={SATURATION_RANGE}
          hueRange={color.hue}
          lightness={color.lightness}
          alpha={color.alpha}
          backgroundColor={theme.palette.background.default}
        >
          <Slider
            value={color.saturation}
            onChange={(saturation) => handleChange({ ...color, saturation })}
            range={SATURATION_RANGE}
            handleColor={handleColor}
          />
        </SaturationHueGradient>
      </div>

      <div className={classes.heading}>lightness</div>
      <div className={classes.slider}>
        <LightnessHueGradient
          lightnessRange={LIGHTNESS_RANGE}
          hueRange={color.hue}
          saturation={color.saturation}
          alpha={color.alpha}
          backgroundColor={theme.palette.background.default}
        >
          <Slider
            value={color.lightness}
            onChange={(lightness) => handleChange({ ...color, lightness })}
            range={LIGHTNESS_RANGE}
            handleColor={handleColor}
          />
        </LightnessHueGradient>
      </div>
    </div>
  )
}

export default GradientPicker
