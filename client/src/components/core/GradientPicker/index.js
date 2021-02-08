import React, { useCallback, useRef, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { interpolate } from 'services/utils'
import Pad from './Pad'
import Slider from 'components/core/Slider'
import hueAlpha from './gradients/hueAlpha'
import saturationHue from './gradients/saturationHue'
import lightnessHue from './gradients/lightnessHue'

const HUE_RANGE = [0, 360]
const SATURATION_RANGE = [0, 100]
const LIGHTNESS_RANGE = [0, 100]
const ALPHA_RANGE = [0, 1]

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.7em',
    fontStyle: 'italic',
    opacity: 0.8,
    marginBottom: 3,
    '&:not(:first-of-type)': {
      marginTop: 10,
    },
  },
  pad: {
    height: 200,
  },
  slider: {
    marginTop: 10,
  },
}))

const GradientPicker = ({ color, onChange, showLabels = true }) => {
  const theme = useTheme()
  const classes = useStyles({ color })
  const colorRef = useRef(null)

  // save color in ref so that it doesn't need to be included in dependency
  // arrays of handlers below, which would cause them to be recreated
  // every time the color changes
  useEffect(() => {
    colorRef.current = color
  }, [color])

  const onChangePad = useCallback(
    ({ x: hue, y: alpha }) => {
      onChange({ ...colorRef.current, hue, alpha })
    },
    [onChange]
  )

  const onChangeSaturation = useCallback(
    (saturation) => {
      onChange({ ...colorRef.current, saturation })
    },
    [onChange]
  )

  const onChangeLightness = useCallback(
    (lightness) => {
      onChange({ ...colorRef.current, lightness })
    },
    [onChange]
  )

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
      {showLabels && (
        <div className={classes.label}>
          <span>hue / alpha</span>
          <span>
            { color.hue[0].toFixed(0) } - {color.hue[1].toFixed(0)}
            {' / '}
            { color.alpha.toFixed(2) }
          </span>
        </div>
      )}
      <div className={classes.pad}>
        <Pad
          value={{ x: color.hue, y: color.alpha }}
          onChange={onChangePad}
          xRange={HUE_RANGE}
          yRange={ALPHA_RANGE}
          handleColor={handleColor}
          background={hueAlpha({
            hueRange: HUE_RANGE,
            alphaRange: ALPHA_RANGE,
            saturation: color.saturation,
            lightness: color.lightness,
            backgroundColor: theme.palette.background.default,
          })}
        />
      </div>

      <div className={classes.slider}>
        {showLabels && (
          <div className={classes.label}>
            <span>saturation</span>
            <span>{ color.saturation.toFixed(0) }</span>
          </div>
        )}
        <Slider
          value={color.saturation}
          onChange={onChangeSaturation}
          range={SATURATION_RANGE}
          background={saturationHue({
            saturationRange: SATURATION_RANGE,
            hueRange: color.hue,
            lightness: color.lightness,
            alpha: color.alpha,
            backgroundColor: theme.palette.background.paper,
          })}
          handleColor={handleColor}
        />
      </div>

      <div className={classes.slider}>
        {showLabels && (
          <div className={classes.label}>
            <span>lightness</span>
            <span>{ color.lightness.toFixed(0) }</span>
          </div>
        )}
        <Slider
          value={color.lightness}
          onChange={onChangeLightness}
          range={LIGHTNESS_RANGE}
          background={lightnessHue({
            lightnessRange: LIGHTNESS_RANGE,
            hueRange: color.hue,
            saturation: color.saturation,
            alpha: color.alpha,
            backgroundColor: theme.palette.background.paper,
          })}
          handleColor={handleColor}
        />
      </div>
    </div>
  )
}

export default GradientPicker
