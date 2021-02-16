import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    opacity: ({ disabled }) => disabled ? 0.5 : 1,
    cursor: ({ disabled }) => disabled ? 'default' : 'pointer',
    '&:hover': {
      textDecoration: ({ disabled }) => disabled ? 'none' : 'underline',
    }
  },
}))

const File = ({ file, openFile, onMouseEnter, disabled }) => {
  const classes = useStyles({ disabled })
  return (
    <div
      className={classes.root}
      onClick={disabled ? undefined : openFile.bind(null, file)}
      onMouseEnter={onMouseEnter}
    >
      { file.name }
    </div>
  )
}

export default File
