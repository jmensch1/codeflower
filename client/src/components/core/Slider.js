import React, { useCallback } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import MuiSlider from '@material-ui/core/Slider'
import { getPath, setPath, hasPath } from 'services/utils'

const Slider = withStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    marginBottom: 10,
  },
}))(MuiSlider)

const useStyles = makeStyles(theme => ({
  root: {},
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875em',
  },
}))

export const SmartSlider = ({
  range,
  obj,
  defaultObj,
  path,
  onChange,
  label,
  transform = { in: (x) => x, out: (x) => x },
  ...rest
}) => {
  const classes = useStyles()

  const handleChange = useCallback((e, newVal) => {
    onChange(setPath(obj, path, transform.out(newVal)))
  }, [obj, path, onChange, transform])

  const [min, max, step] = range || []

  const value = hasPath(obj, path)
    ? transform.in(getPath(obj, path))
    : transform.in(getPath(defaultObj, path))

  return (
    <div className={classes.root}>
      {label && (
        <div className={classes.labelRow}>
          <label>{ label }</label>
          <span>
            { value instanceof Array ? `${value[0]}/${value[1]}` : value }
          </span>
        </div>
      )}
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        { ...rest }
      />
    </div>
  )
}

export default Slider
