import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { hueGradient } from 'services/utils'
import Pad from './Pad'

const HUE_RANGE = [0, 360]
const LIGHTNESS_RANGE = [0, 100]

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: 10,
    // outline: '1px red solid',
  },
  pad: {
    height: 200,
    width: 250,
    backgroundImage: `linear-gradient(0deg, hsla(0,0%,100%,1) 0%, hsla(0,0%,100%,0) 50%, hsla(0,0%,0%,0) 50%, hsla(0,0%,0%,1) 100%), ${hueGradient({
      hueMin: HUE_RANGE[0],
      hueMax: HUE_RANGE[1],
      saturation: 100,
      lightness: 50,
      alpha: 1,
      steps: 20,
    })}`,
  },
  swatch: {
    height: 30,
    marginBottom: 20,
    background: ({ color }) => hueGradient({
      hueMin: color.hue[0],
      hueMax: color.hue[1],
      saturation: color.saturation,
      lightness: color.lightness,
      alpha: color.alpha,
    }),
  }
}))

const DoubleHuePicker = ({ color, onChange }) => {
  // const [color, setColor] = useState({
  //   hue: [50, 150],
  //   saturation: 100,
  //   lightness: 50,
  //   alpha: 1.0,
  // })

  const classes = useStyles({ color })

  return (
    <div className={classes.root}>
      <div className={classes.swatch} />
      <div className={classes.pad}>
        <Pad
          color={color}
          onChange={onChange}
          hueRange={HUE_RANGE}
          lightnessRange={LIGHTNESS_RANGE}
        />
      </div>
    </div>
  )
}

export default DoubleHuePicker
