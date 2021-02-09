import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colorArray } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const Swatches = ({ color, num = 9, size = '1.5em', margin = '0.5em' }) => {
  const classes = useStyles()
  const colors = useMemo(() => colorArray(color, num), [color, num])
  const svgStyle = useMemo(
    () => ({
      width: size,
      height: size,
      margin,
    }),
    [size, margin]
  )

  return (
    <div className={classes.root}>
      {colors.map((color, idx) => (
        <svg key={idx.toString()} style={svgStyle}>
          <circle r="50%" cx="50%" cy="50%" fill={color} />
        </svg>
      ))}
    </div>
  )
}

export default Swatches
