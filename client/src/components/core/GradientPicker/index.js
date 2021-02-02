import React, { useState, useCallback } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { hueGradient } from 'services/utils'
import Pad from './Pad'
import Slider from './Slider'
import { interpolate } from 'services/utils'
import HueAlphaGradient from './gradients/HueAlpha'

const HUE_RANGE = [0, 360]
const SATURATION_RANGE = [0, 100]
const LIGHTNESS_RANGE = [0, 100]
const ALPHA_RANGE = [1, 0]

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    border: `1px hsla(0, 0%, 100%, 0.6) solid`,
    borderRadius: 5,
    marginBottom: 20,
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
}))

const GradientPicker = ({
  //color,
  onChange
}) => {
  const theme = useTheme()
  const [color, setColor] = useState({
    hue: [50, 150],
    saturation: 100,
    lightness: 50,
    alpha: 1.0,
  })

  const handleChange = useCallback((color) => {
    setColor(color)
    // onChange(color)
  }, [
    // onChange
  ])

  const classes = useStyles({ color })

  const handleColor = `
    hsla(
      0,
      0%,
      ${interpolate(color.lightness, [60, 70], [100, 0])}%,
      1.0
    )
  `

  return (
    <div className={classes.root}>
      <div className={classes.swatch} />
      <div className={classes.heading}>hue/opacity</div>
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
      <Slider
        color={color}
        gradient='saturation'
        value={color.saturation}
        onChange={(saturation) => handleChange({ ...color, saturation })}
        range={SATURATION_RANGE}
        handleColor={handleColor}
      />
      <div className={classes.heading}>lightness</div>
      <Slider
        color={color}
        gradient='lightness'
        value={color.lightness}
        onChange={(lightness) => handleChange({ ...color, lightness })}
        range={LIGHTNESS_RANGE}
        handleColor={handleColor}
      />
    </div>
  )
}

export default GradientPicker
