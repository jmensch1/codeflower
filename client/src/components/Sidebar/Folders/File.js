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
  },
}))

const File = ({ file, onClick, onMouseEnter, disabled }) => {
  const classes = useStyles({ disabled })
  return (
    <div
      className={classes.root}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={disabled ? undefined : onMouseEnter}
    >
      {file.name}
    </div>
  )
}

export default File
