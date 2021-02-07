import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const Swatches = ({ color, num = 9, size = '1.5em', margin = '0.5em' }) => {
  const classes = useStyles()

  const colors = useMemo(() => {
    const [hueMin, hueMax] = color.hue
    const inc = (hueMax - hueMin) / (num - 1)
    return Array.from({ length: num }).map((_, idx) => {
      const { saturation: s, lightness: l, alpha: a } = color
      return `hsla(${hueMin + inc * idx},${s}%,${l}%,${a})`
    })
  }, [color, num])

  return (
    <div className={classes.root}>
      {colors.map((color, idx) => (
        <div
          key={idx.toString()}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: '50%',
            margin,
          }}
        />
      ))}
    </div>
  )
}

export default Swatches
