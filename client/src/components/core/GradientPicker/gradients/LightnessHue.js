import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { hueGradient } from 'services/utils'

const lightnessGradient = 'linear-gradient(-90deg, hsla(0,0%,100%,1) 0%, hsla(0,0%,100%,0) 50%, hsla(0,0%,0%,0) 50%, hsla(0,0%,0%,1) 100%)'

const useStyles = makeStyles({
  root: {
    height: '100%',
    position: 'relative',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundImage: ({ lightnessRange, hueRange, saturation, alpha }) => `${lightnessGradient}, ${hueGradient({
      hueMin: hueRange[0],
      hueMax: hueRange[1],
      saturation,
      lightness: 50,
      alpha,
      steps: 20,
      direction: 'bottom',
    })}`,
  },
})

const LightnessHue = ({
  lightnessRange = [0, 100],
  hueRange = [0, 360],
  saturation = 0,
  alpha = 1.0,
  children,
}) => {
  const classes = useStyles({
    lightnessRange,
    hueRange,
    saturation,
    alpha,
  })

  return (
    <div className={classes.root}>
      <div className={classes.background} />
      { children }
    </div>
  )
}

export default LightnessHue
