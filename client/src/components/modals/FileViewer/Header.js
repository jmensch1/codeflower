import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    borderBottom: `1px ${theme.palette.divider} solid`,
    padding: '1.2em',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: '1.2em',
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

const Header = ({ filePath, metadata, onClose }) => {
  const classes = useStyles()

  if (!metadata) return null
  return (
    <div className={classes.root}>
      <div className={classes.name} title={filePath}>
        {metadata.name}
      </div>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
        size='small'
      >
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default Header
