import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import MuiSlider from '@material-ui/core/Slider'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Slider = withStyles(theme => ({
  root: {
    color: 'white'
  },
  valueLabel: {
    color: 'black',
  }
}))(MuiSlider)

const Controls = ({ forces, onChangeForces }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <label>charge strength</label>
      <Slider
        type='range'
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
        valueLabelDisplay='auto'
      />
      <label>link distance</label>
      <Slider
        min={0}
        max={50}
        value={forces.link.distance}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            link: {
              ...forces.link,
              distance: newVal
            }
          })
        }}
        valueLabelDisplay='auto'
      />
      <label>link iterations</label>
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
        valueLabelDisplay='auto'
      />
      <label>force x/y strength</label>
      <Slider
        type='range'
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
      />
    </div>
  )
}

export default Controls
