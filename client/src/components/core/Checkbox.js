import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getPath, setPath } from 'services/utils'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  box: {
    height: 18,
    width: 24,
    border: `1px ${theme.palette.text.primary} solid`,
    opacity: 0.65,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    height: 8,
    width: 8,
    backgroundColor: theme.palette.text.primary,
    borderRadius: '50%',
  },
}))

export const Checkbox = ({
  obj,
  path,
  onChange,
  label,
}) => {
  const classes = useStyles()
  const checked = getPath(obj, path)

  const handleClick = useCallback(() => {
    onChange(setPath(obj, path, !checked))
  }, [obj, path, checked, onChange])

  return (
    <div className={classes.root} onClick={handleClick}>
      {label && <div className={classes.label}>{ label }</div>}
      <div className={classes.box}>
        { checked ? <div className={classes.circle} /> : null }
      </div>
    </div>
  )
}

export default Checkbox
