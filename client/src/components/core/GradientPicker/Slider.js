import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { hueGradient } from 'services/utils'

const lightnessGradient = 'linear-gradient(-90deg, hsla(0,0%,100%,1) 0%, hsla(0,0%,100%,0) 50%, hsla(0,0%,0%,0) 50%, hsla(0,0%,0%,1) 100%)'
const saturationGradient = 'linear-gradient(90deg, hsla(0,0%,50%,1), hsla(0,0%,50%,0))'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 30,
  },
  lightness: {
    backgroundImage: ({ color }) => `${lightnessGradient}, ${hueGradient({
      hueMin: color.hue[0],
      hueMax: color.hue[1],
      saturation: 100,
      lightness: 50,
      alpha: color.alpha,
      steps: 20,
      direction: 'bottom',
    })}`,
  },
  saturation: {
    backgroundImage: ({ color }) => `${saturationGradient}, ${hueGradient({
      hueMin: color.hue[0],
      hueMax: color.hue[1],
      saturation: 100,
      lightness: 50,
      alpha: color.alpha,
      steps: 20,
      direction: 'bottom',
    })}`,
  }
}))

const Slider = ({ color, gradient }) => {
  const classes = useStyles({ color })

  return (
    <div className={clsx(classes.root, classes[gradient])}></div>
  )
}

export default Slider
