import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: -1,
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    height: 'calc(100% - 64px)',
    width: 800,
    maxWidth: 'calc(100% - 64px)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
}))

const Modal = ({ open, onClose, children }) => {
  const classes = useStyles()

  if (!open) return null
  return (
    <div className={classes.root}>
      <div className={classes.background} onClick={onClose} />
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}

export default Modal
