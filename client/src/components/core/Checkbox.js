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
    height: 20,
    width: 20,
    border: `1px ${theme.palette.text.primary} solid`,
    opacity: 0.65,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
      <div className={classes.label}>{ label }</div>
      <div className={classes.box}>
        { checked ? 'X' : '' }
      </div>
    </div>
  )
}

export default Checkbox
