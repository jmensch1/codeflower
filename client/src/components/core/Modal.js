import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

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
    transform: ({ open }) => open ? 'translateY(0)': 'translateY(-1000%)',
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
    backgroundColor: theme.palette.background.default,
    border: `1px ${theme.palette.divider} solid`,
    borderRadius: 5,
    height: 'calc(100% - 64px)',
    width: 'calc(100% - 64px)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
}))

const Modal = ({ open, onClose, children, classes }) => {
  const clx = useStyles({ open })

  return (
    <div className={clsx(clx.root, classes.root)}>
      <div
        className={clsx(clx.background, classes.background)}
        onClick={onClose}
      />
      <div className={clsx(clx.content, classes.content)}>
        {children}
      </div>
    </div>
  )
}

export default Modal
