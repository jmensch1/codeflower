import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    opacity: ({ disabled }) => (disabled ? 0.3 : 1),
    cursor: ({ disabled }) => (disabled ? 'default' : 'pointer'),
    '&:hover': {
      textDecoration: ({ disabled }) => (disabled ? 'none' : 'underline'),
    },
    marginRight: '1.5em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  openIndicator: {
    display: 'inline-block',
    height: '0.5em',
    width: '0.5em',
    borderRadius: '50%',
    marginLeft: '0.5em',
    backgroundColor: theme.palette.text.primary,
  },
}))

const File = ({ file, onClick, onMouseEnter, disabled, isOpen }) => {
  const classes = useStyles({ disabled, isOpen })
  return (
    <div
      className={classes.root}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={disabled ? undefined : onMouseEnter}
    >
      <span>{file.name}</span>
      {isOpen && <span className={classes.openIndicator} />}
    </div>
  )
}

export default File
