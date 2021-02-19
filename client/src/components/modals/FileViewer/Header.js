import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '4em',
  },
  closeButton: {
    position: 'absolute',
    right: '1em',
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.grey[500],
  },
  name: {
    fontWeight: 'bold',
    fontSize: '1.25em',
  },
  select: {
    width: 150,
    display: 'inline-block',
  },
}))

const Header = ({ openedFile, onClose }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.name} title={openedFile?.path}>
        {openedFile?.name || ' '}
      </div>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
        size="small"
      >
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default Header
