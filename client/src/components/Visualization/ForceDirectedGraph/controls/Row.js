import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    userSelect: 'none',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  arrowAndLabel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  arrow: {
    width: '1.5em',
    height: '1.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& polygon': {
      fill: theme.palette.text.primary,
    },
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {},
  content: {
    paddingTop: '0.75em',
    paddingBottom: '0.5em',
    paddingLeft: ({ indent }) => indent ? '1.5em' : 0,
    position: 'relative',
    '& > *': {
      marginBottom: 12,
    }
  },
  mask: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.paper,
    opacity: 0.6,
    zIndex: 1,
    cursor: 'default',
  },
}))

const Row = ({ label, button, disabled, children }) => {
  const [open, setOpen] = useState(true)
  const classes = useStyles({ open, indent: true })

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.arrowAndLabel} onClick={() => setOpen(!open)}>
          <div className={classes.arrow}>
            <svg viewBox='0 0 20 20' height='1em' width='1em'>
              <polygon
                points={open ? '5,5 10,15, 15,5' : '5,5 15,10 5,15'}
                className={classes.arrow}
              />
            </svg>
          </div>
          <div className={classes.label}>{ label }</div>
        </div>
        <div className={classes.button}>
          { button }
        </div>
      </div>
      {open && (
        <div className={classes.content}>
          {disabled && <div className={classes.mask} />}
          { children }
        </div>
      )}
    </div>
  )
}

export default Row
