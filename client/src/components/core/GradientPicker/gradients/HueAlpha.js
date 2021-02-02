import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import tinycolor from 'tinycolor2'
import { hueGradient, alphaGradient } from 'services/utils'

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
    backgroundImage: ({ hueRange, saturation, lightness, backgroundColor }) => `
      ${alphaGradient({
        saturation: 0,
        lightness: tinycolor(backgroundColor).toHsl().l * 100,
        direction: 'bottom',
      })}
      ,
      ${hueGradient({
        hueMin: hueRange[0],
        hueMax: hueRange[1],
        saturation,
        lightness,
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
})

const HueAlpha = ({
  hueRange = [0, 360],
  alphaRange = [1, 0],
  saturation = 0,
  lightness = 0,
  backgroundColor = 'hsla(0, 0%, 0%, 1.0)',
  children,
}) => {
  const classes = useStyles({
    hueRange,
    alphaRange,
    saturation,
    lightness,
    backgroundColor,
  })

  return (
    <div className={classes.root}>
      <div className={classes.background} />
      { children }
    </div>
  )
}

export default HueAlpha
