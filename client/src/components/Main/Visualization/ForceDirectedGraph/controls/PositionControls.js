/*
NOTE: this may not work because the wheel zoom doesn't seem to
have a predictable range for translate x/y. So the sliders can't be
given an accurate range in advance. And making the range dynamic
creates some weird behavior.

Also rotation messes up the translate x/y.
*/

import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useVisPosition } from 'store/selectors'
import { updateVisPosition } from 'store/actions/vis'
import Slider from 'components/core/Slider'
import { getPaths, createUpdaters, toFixed0, toFixed2 } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: '1em',
    },
  },
}))

const PATHS = ['zoom.x', 'zoom.y', 'zoom.k', 'rotation']

const RANGES = {
  'zoom.x': [-1000, 1000],
  'zoom.y': [-1000, 1000],
  'zoom.k': [0.1, 10],
  'rotation': [0, 360],
}

const PositionControls = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const visPosition = useVisPosition()

  const values = useMemo(() => {
    return getPaths(visPosition, PATHS)
  }, [visPosition])

  const updaters = useMemo(() => {
    return createUpdaters(PATHS, updateVisPosition, dispatch)
  }, [dispatch])

  if (!visPosition) return null
  return (
    <div className={classes.root}>
      <Slider
        label="translate x"
        range={RANGES['zoom.x']}
        value={values['zoom.x']}
        onChange={updaters['zoom.x']}
        renderValue={toFixed0}
      />
      <Slider
        label="translate y"
        range={RANGES['zoom.y']}
        value={values['zoom.y']}
        onChange={updaters['zoom.y']}
        renderValue={toFixed0}
      />
      <Slider
        label="scale"
        range={RANGES['zoom.k']}
        value={values['zoom.k']}
        onChange={updaters['zoom.k']}
        renderValue={toFixed2}
      />
      <Slider
        label="rotation"
        range={RANGES['rotation']}
        value={values['rotation']}
        onChange={updaters['rotation']}
        renderValue={toFixed0}
      />
    </div>
  )
}

export default PositionControls
