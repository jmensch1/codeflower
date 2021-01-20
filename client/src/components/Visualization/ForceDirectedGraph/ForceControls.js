import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from 'components/core/Slider'
import { useVisForces } from 'store/selectors'
import { setVisForces } from 'store/actions/settings'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
}))

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
      <label>alpha decay ({visForces.alphaDecay})</label>
      <Slider
        min={0}
        max={0.1}
        step={0.001}
        value={visForces.alphaDecay}
        onChange={(e, newVal) => {
          onChangeForces({
            ...visForces,
            alphaDecay: newVal,
          })
        }}
      />
      <label>charge strength ({-visForces.charge.strength})</label>
      <Slider
        min={0}
        max={500}
        value={-visForces.charge.strength}
        onChange={(e, newVal) => {
          onChangeForces({
            ...visForces,
            charge: {
              ...visForces.charge,
              strength: -newVal,
            },
          })
        }}
      />
      <label>
        charge distances min/max ({visForces.charge.distanceMin}/
        {visForces.charge.distanceMax})
      </label>
      <Slider
        min={1}
        max={2000}
        value={[visForces.charge.distanceMin, visForces.charge.distanceMax]}
        onChange={(e, newVal) => {
          onChangeForces({
            ...visForces,
            charge: {
              ...visForces.charge,
              distanceMin: newVal[0],
              distanceMax: newVal[1],
            },
          })
        }}
      />
      <label>link distance inner ({visForces.link.distanceInner})</label>
      <Slider
        min={0}
        max={150}
        value={visForces.link.distanceInner}
        onChange={(e, newVal) => {
          onChangeForces({
            ...visForces,
            link: {
              ...visForces.link,
              distanceInner: newVal,
            },
          })
        }}
      />
      <label>link distance outer ({visForces.link.distanceOuter})</label>
      <Slider
        min={0}
        max={150}
        value={visForces.link.distanceOuter}
        onChange={(e, newVal) => {
          onChangeForces({
            ...visForces,
            link: {
              ...visForces.link,
              distanceOuter: newVal,
            },
          })
        }}
      />
      <label>link strength ({visForces.link.strength})</label>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={visForces.link.strength}
        onChange={(e, newVal) => {
          onChangeForces({
            ...visForces,
            link: {
              ...visForces.link,
              strength: newVal,
            },
          })
        }}
      />
      <label>link iterations ({visForces.link.iterations})</label>
      <Slider
        min={0}
        max={10}
        value={visForces.link.iterations}
        onChange={(e, newVal) => {
          onChangeForces({
            ...visForces,
            link: {
              ...visForces.link,
              iterations: newVal,
            },
          })
        }}
      />
      <label>force x/y strength ({visForces.forceX.strength.toFixed(2)})</label>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={visForces.forceX.strength}
        onChange={(e, newVal) => {
          onChangeForces({
            ...visForces,
            forceX: {
              ...visForces.forceX,
              strength: newVal,
            },
            forceY: {
              ...visForces.forceY,
              strength: newVal,
            },
          })
        }}
      />
      <label>force center strength ({visForces.center.strength})</label>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={visForces.center.strength}
        onChange={(e, newVal) => {
          onChangeForces({
            ...visForces,
            center: {
              ...visForces.center,
              strength: newVal,
            },
          })
        }}
      />
    </div>
  )
}

export default ForceControls
