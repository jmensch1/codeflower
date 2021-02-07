import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useVisForces } from 'store/selectors'
import { updateVisForces } from 'store/actions/settings'
import Slider from 'components/core/Slider'
import Collapse from 'components/core/Collapse'
import { getPaths, createUpdaters } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {},
  instructions: {
    fontSize: '0.875em',
    fontStyle: 'italic',
    marginBottom: '1.25em',
  },
}))

const toFixed2 = (x) => x.toFixed(2)

const PATHS = [
  'charge.enabled',
  'charge.strength',
  'charge.distanceMin',
  'link.enabled',
  'link.strength',
  'link.distance.files',
  'link.distance.folders',
  'link.iterations',
  'forceXY.enabled',
  'forceXY.strength',
]

const RANGES = {
  'charge.strength': [-500, 0, 1],
  'charge.distanceMin': [1, 500],
  'link.strength': [0, 1, 0.01],
  'link.distance.files': [0, 150, 1],
  'link.distance.folders': [0, 150, 1],
  'link.iterations': [0, 5, 1],
  'forceXY.strength': [0, 1, 0.01],
}

const ForceControls = () => {
  const classes = useStyles()
  const visForces = useVisForces()
  const dispatch = useDispatch()

  const values = useMemo(() => {
    return getPaths(visForces, PATHS)
  }, [visForces])

  const updaters = useMemo(() => {
    return createUpdaters(PATHS, updateVisForces, dispatch)
  }, [dispatch])

  if (!visForces) return null
  return (
    <div className={classes.root}>
      <div className={classes.instructions}>
        Adjust the&nbsp;
        <a
          href="https://github.com/d3/d3-force"
          target="_blank"
          rel="noreferrer"
        >
          forces
        </a>
        &nbsp;that apply to the graph.
      </div>

      <Collapse
        label="charge"
        disabled={!values['charge.enabled']}
        initialOpen
      >
        <Slider
          label="strength"
          range={RANGES['charge.strength']}
          value={values['charge.strength']}
          onChange={updaters['charge.strength']}
        />
        <Slider
          label="distance min"
          range={RANGES['charge.distanceMin']}
          value={values['charge.distanceMin']}
          onChange={updaters['charge.distanceMin']}
        />
      </Collapse>

      <Collapse
        label="link"
        disabled={!values['link.enabled']}
        initialOpen
      >
        <Slider
          label="strength"
          range={RANGES['link.strength']}
          value={values['link.strength']}
          onChange={updaters['link.strength']}
          renderValue={toFixed2}
        />
        <Slider
          label="distance: files"
          range={RANGES['link.distance.files']}
          value={values['link.distance.files']}
          onChange={updaters['link.distance.files']}
        />
        <Slider
          label="distance: folders"
          range={RANGES['link.distance.folders']}
          value={values['link.distance.folders']}
          onChange={updaters['link.distance.folders']}
        />
        <Slider
          label="iterations"
          range={RANGES['link.iterations']}
          value={values['link.iterations']}
          onChange={updaters['link.iterations']}
        />
      </Collapse>

      <Collapse
        label="x/y"
        disabled={!values['forceXY.enabled']}
        initialOpen
      >
        <Slider
          label="strength"
          range={RANGES['forceXY.strength']}
          value={values['forceXY.strength']}
          onChange={updaters['forceXY.strength']}
          renderValue={toFixed2}
        />
      </Collapse>
    </div>
  )
}

export default ForceControls
