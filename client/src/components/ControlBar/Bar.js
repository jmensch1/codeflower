import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: 100,
    right: 10,
    zIndex: 1,
    width: 50,
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    backgroundColor: theme.palette.background.paper,
    opacity: 0.95,
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
}))

const Bar = ({ children }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <div className={classes.background} />
      { children }
    </Paper>
  )
}

export default Bar
