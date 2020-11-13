import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 400,
    right: 10,
    zIndex: 1,
    width: 50,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
}))

const ButtonGroupBar = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        { children }
      </Paper>
    </div>
  )
}

export default ButtonGroupBar
