import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import MuiSlider from '@material-ui/core/Slider'
import TextButton from 'components/core/TextButton'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
  alphaBar: {
    height: 15,
    backgroundColor: theme.palette.action.hover,
    marginBottom: 20,
  },
  alphaInner: {
    height: '100%',
    width: ({ alpha }) => `${alpha * 100}%`,
    backgroundColor: theme.palette.action.selected,
  },
}))

const Slider = withStyles((theme) => ({
  root: {
    color: 'white',
    marginBottom: 10,
  },
  valueLabel: {
    color: 'black',
  },
}))(MuiSlider)

const Controls = ({
  alpha,
  forces,
  onChangeForces,
  display,
  onChangeDisplay,
  onRestart,
}) => {
  const classes = useStyles({ alpha })

  return (
    <div className={classes.root}>
      <div className={classes.alphaBar}>
        <div className={classes.alphaInner} />
      </div>
      <label>alpha decay ({forces.alphaDecay})</label>
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
      />
      <label>charge strength ({-forces.charge.strength})</label>
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
            },
          })
        }}
      />
      <label>
        charge distances min/max ({forces.charge.distanceMin}/
        {forces.charge.distanceMax})
      </label>
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
            },
          })
        }}
      />
      <label>link distance inner ({forces.link.distanceInner})</label>
      <Slider
        min={0}
        max={150}
        value={forces.link.distanceInner}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            link: {
              ...forces.link,
              distanceInner: newVal,
            },
          })
        }}
      />
      <label>link distance outer ({forces.link.distanceOuter})</label>
      <Slider
        min={0}
        max={150}
        value={forces.link.distanceOuter}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            link: {
              ...forces.link,
              distanceOuter: newVal,
            },
          })
        }}
      />
      <label>link strength ({forces.link.strength})</label>
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
              strength: newVal,
            },
          })
        }}
      />
      <label>link iterations ({forces.link.iterations})</label>
      <Slider
        min={0}
        max={10}
        value={forces.link.iterations}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            link: {
              ...forces.link,
              iterations: newVal,
            },
          })
        }}
      />
      <label>force x/y strength ({forces.forceX.strength.toFixed(2)})</label>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={forces.forceX.strength}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            forceX: {
              ...forces.forceX,
              strength: newVal,
            },
            forceY: {
              ...forces.forceY,
              strength: newVal,
            },
          })
        }}
      />
      <label>force center strength ({forces.center.strength})</label>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={forces.center.strength}
        onChange={(e, newVal) => {
          onChangeForces({
            ...forces,
            center: {
              ...forces.center,
              strength: newVal,
            },
          })
        }}
      />
      <TextButton
        label="restart"
        style={{ width: '100%', marginBottom: 15 }}
        onClick={onRestart}
      />
      <label>file size coeff ({display.files.radius.coeff})</label>
      <Slider
        min={0}
        max={50}
        step={1}
        value={display.files.radius.coeff}
        onChange={(e, newVal) => {
          onChangeDisplay({
            ...display,
            files: {
              ...display.files,
              radius: {
                ...display.files.radius,
                coeff: newVal,
              },
            },
          })
        }}
      />
      <label>file size exponent ({display.files.radius.exponent})</label>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={display.files.radius.exponent}
        onChange={(e, newVal) => {
          onChangeDisplay({
            ...display,
            files: {
              ...display.files,
              radius: {
                ...display.files.radius,
                exponent: newVal,
              },
            },
          })
        }}
      />
      <label>
        file hue min/max ({display.files.color.hue[0]}/
        {display.files.color.hue[1]})
      </label>
      <Slider
        min={0}
        max={360}
        value={display.files.color.hue}
        onChange={(e, newVal) => {
          onChangeDisplay({
            ...display,
            files: {
              ...display.files,
              color: {
                ...display.files.color,
                hue: newVal,
              }
            },
          })
        }}
      />
      <label>file opacity ({display.files.opacity.toFixed(2)})</label>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={display.files.opacity}
        onChange={(e, newVal) => {
          onChangeDisplay({
            ...display,
            files: {
              ...display.files,
              opacity: newVal,
            }
          })
        }}
      />
      <label>vis rotation ({display.rotation})</label>
      <Slider
        min={0}
        max={360}
        value={display.rotation}
        onChange={(e, newVal) => {
          onChangeDisplay({
            ...display,
            rotation: newVal,
          })
        }}
      />
    </div>
  )
}

export default Controls
