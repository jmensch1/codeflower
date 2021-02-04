import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SmartSlider } from 'components/core/Slider'
import { useVisForces } from 'store/selectors'
import { setVisForces } from 'store/actions/settings'
import { useDispatch } from 'react-redux'
import Row from './Row'
import { getPath } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {},
  instructions: {
    fontSize: '0.875em',
    fontStyle: 'italic',
    marginBottom: '1.25em',
  },
}))

const toFixed2 = (x) => x.toFixed(2)

const ForceControls = () => {
  const classes = useStyles()
  const visForces = useVisForces()
  const dispatch = useDispatch()

  const onChangeForces = useCallback((visForces) => {
    dispatch(setVisForces(visForces))
  }, [dispatch])

  if (!visForces) return null
  return (
    <div className={classes.root}>
      <div className={classes.instructions}>
        Adjust the&nbsp;
        <a
          href="https://github.com/d3/d3-force"
          target="_blank"
          rel="noreferrer">
          d3 forces
        </a>
        &nbsp;that apply to the graph.
      </div>

      <Row
        label='charge'
        disabled={!getPath(visForces, 'charge.enabled')}
        initialOpen
      >
        <SmartSlider
          label='strength'
          range={[-500, 0, 1]}
          obj={visForces}
          path='charge.strength'
          onChange={onChangeForces}
          alwaysOpen
        />
        <SmartSlider
          label='distance min'
          range={[1, 500]}
          obj={visForces}
          path='charge.distanceMin'
          onChange={onChangeForces}
          alwaysOpen
        />
      </Row>
      
      <Row
        label='link'
        disabled={!getPath(visForces, 'link.enabled')}
        initialOpen
      >
        <SmartSlider
          label='strength'
          range={[0, 1, 0.01]}
          obj={visForces}
          path='link.strength'
          onChange={onChangeForces}
          alwaysOpen
          renderValue={toFixed2}
        />
        <SmartSlider
          label='distance: files'
          range={[0, 150, 1]}
          obj={visForces}
          path='link.distance.files'
          onChange={onChangeForces}
          alwaysOpen
        />
        <SmartSlider
          label='distance: folders'
          range={[0, 150, 1]}
          obj={visForces}
          path='link.distance.folders'
          onChange={onChangeForces}
          alwaysOpen
        />
        <SmartSlider
          label='iterations'
          range={[0, 5, 1]}
          obj={visForces}
          path='link.iterations'
          onChange={onChangeForces}
          alwaysOpen
        />
      </Row>

      <Row
        label='x/y'
        disabled={!getPath(visForces, 'forceXY.enabled')}
        initialOpen
      >
        <SmartSlider
          label='strength'
          range={[0, 1, 0.01]}
          obj={visForces}
          path='forceXY.strength'
          onChange={onChangeForces}
          alwaysOpen
          renderValue={toFixed2}
        />
      </Row>
    </div>
  )
}

export default ForceControls
