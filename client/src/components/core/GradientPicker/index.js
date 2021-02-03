import React, { useCallback, useRef, useEffect } from 'react'
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
const ALPHA_RANGE = [0, 1]

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: 10,
    // border: `1px hsla(0, 0%, 100%, 0.6) solid`,
    // borderRadius: 5,
    // marginBottom: 30,
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
    '&:not(:first-of-type)': {
      marginTop: 10,
    },
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
  onChange,
  showSwatches,
}) => {
  const theme = useTheme()
  const classes = useStyles({ color })
  const colorRef = useRef(null)

  // save color in ref so that it doesn't need to be included in dependency
  // arrays of handlers below, which would cause them to be recreated
  // every time the color changes
  useEffect(() => {
    colorRef.current = color
  }, [color])

  const handleHueAlphaChange = useCallback(({ x: hue, y: alpha }) => {
    onChange({ ...colorRef.current, hue, alpha })
  }, [onChange])

  const handleSaturationChange = useCallback((saturation) => {
    onChange({ ...colorRef.current, saturation })
  }, [onChange])

  const handleLightnessChange = useCallback((lightness) => {
    onChange({ ...colorRef.current, lightness })
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
      { showSwatches && <Swatches color={color} /> }

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
            onChange={handleHueAlphaChange}
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
            onChange={handleSaturationChange}
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
            onChange={handleLightnessChange}
            range={LIGHTNESS_RANGE}
            handleColor={handleColor}
          />
        </LightnessHueGradient>
      </div>
    </div>
  )
}

export default GradientPicker
