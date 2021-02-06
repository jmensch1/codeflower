import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import { alphaGradient, hueGradient, checkerGradient } from 'services/utils'
// import tinycolor from 'tinycolor2'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    position: 'relative',
    backgroundColor: ({ hue, alpha }) => `hsla(${hue}, 100%, 50%, 1.0)`,
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: `
        linear-gradient(
          to top,
            hsla(0, 0%, 0%, 1.0),
            hsla(0, 0%, 0%, 0)
        )
        ,
        linear-gradient(
          to right,
            hsla(0, 0%, 100%, 1.0),
            hsla(0, 0%, 100%, 0)
        )
      `,
    },

    // make background responsive to alpha
    // '&:before': {
    //   content: '""',
    //   position: 'absolute',
    //   top: 0,
    //   bottom: 0,
    //   left: 0,
    //   right: 0,
    //   zIndex: 1,
    //   backgroundColor: theme.palette.background.paper,
    //   opacity: ({ alpha }) => 1 - alpha,
    // }

    // hue alpha background
    // background: `
    //   ${alphaGradient({
    //     alphaMin: 0,
    //     alphaMax: 1,
    //     saturation: 0,
    //     lightness: tinycolor(theme.palette.background.paper).toHsl().l * 100,
    //     direction: 'bottom',
    //   })}
    //   ,
    //   ${hueGradient({
    //     hueMin: 0,
    //     hueMax: 360,
    //     saturation: 100,
    //     lightness: 50,
    //   })}
    // `,
    // '&:after': {
    //   content: '""',
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   right: 0,
    //   bottom: 0,
    //   background: checkerGradient({
    //     alpha: 0.05,
    //     backgroundColor: theme.palette.background.paper,
    //     size: 4,
    //   }),
    // },
  },
}))

const Background = ({ hue, alpha }) => {
  const classes = useStyles({ hue, alpha })
  return <div className={classes.root} />
}

export default Background
