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
    borderBottom: `1px ${theme.palette.divider} solid`,
  },
  closeButton: {
    position: 'absolute',
    right: '1em',
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.grey[500],
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.25em',
  },
}))

const Header = ({ onClose }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.title}>Export</div>
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
