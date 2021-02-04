import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { hueGradient, checkerGradient } from 'services/utils'

const saturationGradient = ({ alpha }) => {
  return `
    linear-gradient(
      90deg,
        hsla(0,0%,50%,${alpha}),
        hsla(0,0%,50%,0)
    )
  `
}

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
    background: ({ saturationRange, hueRange, lightness, alpha }) => `
      ${saturationGradient({
        alpha,
      })}
      ,
      ${hueGradient({
        hueMin: hueRange[0],
        hueMax: hueRange[1],
        saturation: 100,
        lightness,
        alpha,
        steps: 20,
        direction: 'bottom',
      })}
    `,
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: ({ backgroundColor }) =>
        checkerGradient({
          alpha: 0.008,
          backgroundColor,
        }),
    },
  },
})

const LightnessHue = ({
  saturationRange = [0, 100],
  hueRange = [0, 360],
  lightness = 0,
  alpha = 1.0,
  backgroundColor = 'hsla(0, 0%, 0%, 1.0)',
  children,
}) => {
  const classes = useStyles({
    saturationRange,
    hueRange,
    lightness,
    alpha,
    backgroundColor,
  })

  return (
    <div className={classes.root}>
      <div className={classes.background} />
      {children}
    </div>
  )
}

export default LightnessHue
