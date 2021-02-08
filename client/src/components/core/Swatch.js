import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colorString, hueGradient } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '2em',
    height: '1em',
    borderRadius: '0.25em',
    background: ({ color }) =>
      color?.hue instanceof Array
        ? hueGradient({
            hueRange: color.hue,
            saturation: color.saturation,
            lightness: color.lightness,
            alpha: color.alpha,
          })
        : colorString(color),
  },
}))

const Swatch = ({ color }) => {
  const classes = useStyles({ color })
  return <div className={classes.root} />
}

export default Swatch
