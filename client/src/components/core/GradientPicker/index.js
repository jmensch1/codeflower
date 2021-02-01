import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { hueGradient, alphaGradient } from 'services/utils'
import Pad from './Pad'
import Slider from 'components/core/Slider'
import NewSlider from './Slider'
import tinycolor from 'tinycolor2'

const HUE_RANGE = [0, 360]
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
  },
  pad: {
    height: 200,
    marginBottom: 10,
    position: 'relative',
  },
  padBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundImage: `
      ${alphaGradient({
        saturation: 0,
        lightness: tinycolor(theme.palette.background.paper).toHsl().l * 100,
        direction: 'bottom',
      })}
      ,
      ${hueGradient({
        hueMin: HUE_RANGE[0],
        hueMax: HUE_RANGE[1],
        saturation: 100,
        lightness: 50,
        alpha: 1.0,
        steps: 20,
      })}
    `,
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      // checker gradient taken from https://hslpicker.com/
      // TODO: gradient needs to vary with theme.palette.background.paper
      backgroundSize: '20px 20px',
      backgroundPosition: '0px 0px, 10px 10px',
      backgroundImage: `
        linear-gradient(
          45deg,
            rgba(255,255,255,0.008) 25%,
            transparent 25%,transparent 75%,
            rgba(255,255,255,0.008) 75%,
            rgba(255,255,255,0.008)
        )
        ,
        linear-gradient(
          45deg,
            rgba(255,255,255,0.008) 25%,
            transparent 25%,
            transparent 75%,
            rgba(255,255,255,0.008) 75%,
            rgba(255,255,255,0.008)
        )
      `,
    }
  },

}))

const GradientPicker = ({ /* color, */ onChange }) => {
  const [color, setColor] = useState({
    hue: [50, 150],
    saturation: 100,
    lightness: 50,
    alpha: 1.0,
  })

  const classes = useStyles({ color })

  return (
    <div className={classes.root}>
      <div className={classes.swatch} />

      <div className={classes.heading}>hue/opacity</div>
      <div className={classes.pad}>
        <div className={classes.padBackground} />
        <Pad
          color={color}
          value={{
            x: color.hue,
            y: color.alpha,
          }}
          //onChange={onChange}
          onChange={({ x: hue, y: alpha }) => setColor({ ...color, hue, alpha })}
          xRange={HUE_RANGE}
          yRange={ALPHA_RANGE}
        />
      </div>
      <div className={classes.heading}>saturation</div>
      <NewSlider color={color} gradient='saturation' />
      <div style={{ height: 10 }} />
      <div className={classes.heading}>lightness</div>
      <NewSlider color={color} gradient='lightness' />
      {/*<Slider
        label='saturation'
        range={[0, 100, 1]}
        value={color.saturation}
        onChange={(saturation) => setColor({ ...color, saturation })}
        alwaysOpen
      />
      <Slider
        label='lightness'
        range={[0, 1, 0.01]}
        value={color.lightness}
        onChange={(lightness) => setColor({ ...color, lightness })}
        alwaysOpen
      />*/}
    </div>
  )
}

export default GradientPicker
