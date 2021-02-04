import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { getPath, setPath } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  svg: {
    height: '1.2em',
    width: '1.2em',
  },
  outer: {
    stroke: theme.palette.text.primary,
    strokeWidth: 2,
    fill: 'transparent',
  },
  inner: {
    fill: theme.palette.text.primary,
    display: ({ checked }) => (checked ? 'block' : 'none'),
  },
}))

export const Checkbox = ({ obj, path, onChange, label }) => {
  const checked = getPath(obj, path)
  const classes = useStyles({ checked })

  const handleClick = useCallback(() => {
    onChange(setPath(obj, path, !checked))
  }, [obj, path, checked, onChange])

  return (
    <div className={classes.root} onClick={handleClick}>
      {label && <div className={classes.label}>{label}</div>}
      <svg viewBox="0 0 24 24" className={classes.svg}>
        <circle r={10} cx={12} cy={12} className={classes.outer} />
        <circle r={4} cx={12} cy={12} className={classes.inner} />
      </svg>
    </div>
  )
}

export default Checkbox
