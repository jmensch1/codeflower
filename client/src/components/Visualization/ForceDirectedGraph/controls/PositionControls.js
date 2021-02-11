/*
NOTE: this may not work because the wheel zoom doesn't seem to
have a predictable range for translate x/y. So the sliders can't be
given an accurate range in advance. And making the range dynamic
creates some weird behavior.
*/

import React, { useMemo, useRef, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useVisPosition } from 'store/selectors'
import { setVisPosition } from 'store/actions/settings'
import Slider from 'components/core/Slider'
import { getPaths, toFixed0, toFixed2 } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: '1em',
    },
  },
}))

const PATHS = ['x', 'y', 'k']

const RANGES = {
  x: [-1000, 1000],
  y: [-1000, 1000],
  k: [0.1, 10],
}

const PositionControls = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const visPosition = useVisPosition()
  const visPositionRef = useRef(null)

  const values = useMemo(() => {
    return getPaths(visPosition, PATHS)
  }, [visPosition])

  useEffect(() => {
    visPositionRef.current = visPosition
  }, [visPosition])

  const updateVisPosition = useCallback((newValues) => {
    dispatch(setVisPosition({
      ...visPositionRef.current,
      ...newValues,
      source: 'slider',
    }))
  }, [dispatch])

  if (!visPosition) return null
  return (
    <div className={classes.root}>
      <Slider
        label="translate x"
        range={RANGES['x']}
        value={values['x']}
        onChange={(x) => updateVisPosition({ x })}
        renderValue={toFixed0}
      />
      <Slider
        label="translate y"
        range={RANGES['y']}
        value={values['y']}
        onChange={(y) => updateVisPosition({ y })}
        renderValue={toFixed0}
      />
      <Slider
        label="scale"
        range={RANGES['k']}
        value={values['k']}
        onChange={(k) => updateVisPosition({ k })}
        renderValue={toFixed2}
      />
    </div>
  )
}

export default PositionControls
