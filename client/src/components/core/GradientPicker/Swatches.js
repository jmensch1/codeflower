import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const NUM_STEPS = 8

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
  },
}))

const Swatches = ({ color }) => {
  const classes = useStyles()

  const [hueMin, hueMax] = color.hue
  const inc = (hueMax - hueMin) / NUM_STEPS
  const colors = Array.from({ length: NUM_STEPS + 1 })
    .map((_, idx) => {
      const { saturation: s, lightness: l, alpha: a } = color
      return `hsla(${hueMin + inc * idx},${s}%,${l}%,${a})`
    })

  return (
    <div className={classes.root}>
      {colors.map((color, idx) => (
        <div
          key={idx.toString()}
          style={{
            width: 20,
            height: 20,
            backgroundColor: color,
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  )
}

export default Swatches
