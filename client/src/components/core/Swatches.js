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
