import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    display: 'flex',
    alignItems: 'center',
  },
  alphaBar: {
    height: 12,
    backgroundColor: theme.palette.action.hover,
    width: 200,
    marginLeft: 10,
  },
  alphaInner: {
    height: '100%',
    width: ({ alpha }) => `${alpha * 100}%`,
    backgroundColor: theme.palette.action.selected,
  },
}))

const Extras = ({ alpha, onRestart }) => {
  const classes = useStyles({ alpha })

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="restart"
        size="small"
        className={classes.button}
        onClick={onRestart}
      >
        <RefreshIcon />
      </IconButton>
      <div className={classes.alphaBar}>
        <div className={classes.alphaInner} />
      </div>
    </div>
  )
}

export default Extras
