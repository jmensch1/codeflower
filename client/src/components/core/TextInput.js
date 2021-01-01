import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  input: {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px white solid',
    outline: 'none',
    color: theme.palette.text.primary,
    fontSize: '1rem',
    marginBottom: 0,
    height: '100%',
    width: '100%',
  },
  error: {
    position: 'absolute',
    top: 'calc(100% + 5px)',
    left: '50%',
    transform: 'translateX(-50%)',
    color: theme.palette.error.main,
  },
}))

const TextInput = ({ onChange, className, style, ...rest }) => {
  const classes = useStyles()
  return (
    <div className={classes.root} style={style}>
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        className={clsx(classes.input, className)}
        spellCheck={false}
        {...rest}
      />
      <div className={classes.error}>Hello</div>
    </div>
  )
}

export default TextInput
