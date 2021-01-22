import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiSlider from '@material-ui/core/Slider'
import { getPath, setPath, hasPath } from 'services/utils'
import clsx from 'clsx'
import { hueGradient, lightnessGradient, opacityGradient } from 'services/utils'

const useSliderStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
    marginBottom: 10,
  },
  rail: {},
  hue: {
    background: hueGradient(),
    opacity: 1,
  },
  lightness: {
    background: lightnessGradient(),
    opacity: 1,
  },
  opacity: {
    background: opacityGradient(),
    opacity: 1,
  }
}))

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
  gradient,
  ...rest
}) => {
  const classes = useStyles()
  const sliderClasses = useSliderStyles({ gradient })

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
      <MuiSlider
        classes={{
          root: sliderClasses.root,
          rail: clsx(sliderClasses.rail, sliderClasses[gradient]),
        }}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        track={false}
        { ...rest }
      />
    </div>
  )
}

export default SmartSlider
