import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { hueGradient, alphaGradient } from 'services/utils'
import Pad from './Pad'
import Slider from 'components/core/Slider'

const X_RANGE = [0, 360]
const Y_RANGE = [1, 0]

const lightnessGradient = 'linear-gradient(0deg, hsla(0,0%,100%,1) 0%, hsla(0,0%,100%,0) 50%, hsla(0,0%,0%,0) 50%, hsla(0,0%,0%,1) 100%)'
const checkerGradient = 'linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%)'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    border: `1px hsla(0, 0%, 100%, 0.6) solid`,
    borderRadius: 5,
    marginBottom: 20,
  },

  pad: {
    height: 200,
    marginBottom: 10,
    position: 'relative',
    backgroundImage: `${alphaGradient({
      lightness: 21,
      saturation: 0,
      direction: 'bottom',
    })}, ${hueGradient({
      hueMin: X_RANGE[0],
      hueMax: X_RANGE[1],
      saturation: 100,
      lightness: 50,
      alpha: 1.0,
      steps: 20,
    })}`,
  },
  // background: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   zIndex: -1,
  //   backgroundPosition: '0px 0px, 10px 10px',
  //   backgroundSize: '20px 20px',
  //   backgroundImage: 'linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%)',
  // },
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
  }
}))

const DoubleHuePicker = ({ /* color, */ onChange }) => {
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
      <div className={classes.pad}>
        <div className={classes.background} />
        <Pad
          color={color}
          value={{
            x: color.hue,
            y: color.alpha,
          }}
          //onChange={onChange}
          onChange={({ x: hue, y: alpha }) => setColor({ ...color, hue, alpha })}
          xRange={X_RANGE}
          yRange={Y_RANGE}
        />
      </div>
      <Slider
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
      />
    </div>
  )
}

export default DoubleHuePicker
