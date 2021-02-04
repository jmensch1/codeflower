import React, { useCallback, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiSlider from '@material-ui/core/Slider'
import clsx from 'clsx'
import { hueGradient, lightnessGradient, opacityGradient } from 'services/utils'

const THUMB_SIZE = 8

const useSliderStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    color: theme.palette.text.primary,
  },
  rail: {
    height: 1,
    left: -THUMB_SIZE / 2,
    width: `calc(100% + ${THUMB_SIZE}px)`,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    marginTop: -THUMB_SIZE / 2,
    marginLeft: -THUMB_SIZE / 2,
  },
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
  },
}))

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.875em',
    cursor: ({ alwaysOpen }) => (alwaysOpen ? 'default' : 'pointer'),
    '&:hover > label': {
      textDecoration: ({ alwaysOpen }) => (alwaysOpen ? 'none' : 'underline'),
    },
  },
  label: {
    cursor: 'inherit',
  },
  slider: {
    padding: `0 ${THUMB_SIZE / 2}px`,
  },
}))

const Slider = ({
  range,
  value,
  onChange,
  label,
  gradient,
  isOpen,
  alwaysOpen,
  ...rest
}) => {
  const classes = useStyles({ alwaysOpen })
  const sliderClasses = useSliderStyles({ gradient })
  const [open, setOpen] = useState(alwaysOpen || isOpen)

  const handleChange = useCallback(
    (e, newVal) => {
      onChange(newVal)
    },
    [onChange]
  )

  const [min, max, step] = range || []

  useEffect(() => {
    // setOpen(!!isOpen)
  }, [isOpen])

  return (
    <div className={classes.root}>
      {label && (
        <div
          className={classes.header}
          onClick={alwaysOpen ? undefined : () => setOpen(!open)}
        >
          <label className={classes.label}>{label}</label>
          <span>
            {value instanceof Array ? `${value[0]}/${value[1]}` : value}
          </span>
        </div>
      )}
      {open && (
        <div className={classes.slider}>
          <MuiSlider
            classes={{
              root: sliderClasses.root,
              rail: clsx(sliderClasses.rail, sliderClasses[gradient]),
              thumb: sliderClasses.thumb,
            }}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            track={false}
            {...rest}
          />
        </div>
      )}
    </div>
  )
}

export default Slider
