// NOTE: parent component must be relatively positioned

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
  },
  aperture: {
    border: `1px ${theme.palette.text.primary} dashed`,
    position: 'absolute',
  },
  blocker: {
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.8,
  },
}))

const Aperture = ({ aperture }) => {
  const classes = useStyles()
  const { left, top, width, height } = aperture
  return (
    <div className={classes.root}>
      <div
        className={classes.aperture}
        style={{ left, top, width, height }}
      />
      <div
        className={classes.blocker}
        style={{ top: 0, bottom: 0, left: 0, width: left }}
      />
      <div
        className={classes.blocker}
        style={{ top: 0, bottom: 0, right: 0, width: left }}
      />
      <div
        className={classes.blocker}
        style={{ left: 0, right: 0, top: 0, height: top }}
      />
      <div
        className={classes.blocker}
        style={{ left: 0, right: 0, bottom: 0, height: top }}
      />
    </div>
  )
}

export default Aperture
