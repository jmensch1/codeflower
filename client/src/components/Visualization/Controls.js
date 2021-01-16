import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import MuiSlider from '@material-ui/core/Slider'
import TextButton from 'components/core/TextButton'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
  alphaBar: {
    height: 15,
    backgroundColor: theme.palette.grey[700],
    marginBottom: 20,
  },
  alphaInner: {
    height: '100%',
    width: ({ alpha }) => `${alpha * 100}%`,
    backgroundColor: theme.palette.grey[500],
  }
}))

const Slider = withStyles(theme => ({
  root: {
    color: 'white',
    marginBottom: 10,
  },
  valueLabel: {
    color: 'black',
  }
}))(MuiSlider)

const Controls = ({ forces, onJiggle, onChangeForces, alpha }) => {
  const classes = useStyles({ alpha })
  const visControlsEl = useRef(document.getElementById('vis-controls'))

  return createPortal(
    <div className={classes.root}>
      <div className={classes.alphaBar}>
        <div className={classes.alphaInner} />
      </div>
      <label>alpha decay ({ forces.alphaDecay })</label>
      <Slider
        min={0}
        max={0.1}
        step={0.001}
        value={forces.alphaDecay}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            alphaDecay: newVal,
          })
        }}
        valueLabelDisplay='off'
      />
      <label>charge strength ({ -forces.charge.strength })</label>
      <Slider
        min={0}
        max={500}
        value={-forces.charge.strength}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            charge: {
              ...forces.charge,
              strength: -newVal,
            }
          })
        }}
        valueLabelDisplay='off'
      />
      <label>charge distances min/max ({forces.charge.distanceMin}/{forces.charge.distanceMax})</label>
      <Slider
        min={1}
        max={2000}
        value={[forces.charge.distanceMin, forces.charge.distanceMax]}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            charge: {
              ...forces.charge,
              distanceMin: newVal[0],
              distanceMax: newVal[1],
            }
          })
        }}
        valueLabelDisplay='off'
      />
      <label>link distance inner ({ forces.link.distanceInner })</label>
      <Slider
        min={0}
        max={150}
        value={forces.link.distanceInner}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            link: {
              ...forces.link,
              distanceInner: newVal
            }
          })
        }}
        valueLabelDisplay='off'
      />
      <label>link distance outer ({ forces.link.distanceOuter })</label>
      <Slider
        min={0}
        max={150}
        value={forces.link.distanceOuter}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            link: {
              ...forces.link,
              distanceOuter: newVal
            }
          })
        }}
        valueLabelDisplay='off'
      />
      <label>link strength ({ forces.link.strength })</label>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={forces.link.strength}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            link: {
              ...forces.link,
              strength: newVal
            }
          })
        }}
        valueLabelDisplay='off'
      />
      <label>link iterations ({ forces.link.iterations })</label>
      <Slider
        min={0}
        max={10}
        value={forces.link.iterations}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            link: {
              ...forces.link,
              iterations: newVal
            }
          })
        }}
        valueLabelDisplay='off'
      />
      <label>force x/y strength ({ forces.forceX.strength })</label>
      <Slider
        min={0}
        max={100}
        value={forces.forceX.strength * 100}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            forceX: {
              ...forces.forceX,
              strength: newVal / 100,
            },
            forceY: {
              ...forces.forceY,
              strength: newVal / 100,
            },
          })
        }}
        valueLabelDisplay='off'
      />
      <TextButton
        label='jiggle'
        style={{ width:'100%' }}
        onClick={onJiggle}
      />
    </div>,
    visControlsEl.current
  )
}

export default Controls
