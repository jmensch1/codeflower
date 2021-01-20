import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from 'components/core/Slider'
import TextButton from 'components/core/TextButton'
import { useVisStyles, useVisForces } from 'store/selectors'
import { setVisStyles, setVisForces } from 'store/actions/settings'
import { useDispatch } from 'react-redux'

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

const Controls = ({
  alpha,
  onRestart,
}) => {
  const classes = useStyles({ alpha })
  const visStyles = useVisStyles()
  const visForces = useVisForces()
  const dispatch = useDispatch()

  const onChangeForces = useCallback((visForces) => {
    dispatch(setVisForces(visForces))
  }, [dispatch])

  const onChangeDisplay = useCallback((visStyles) => {
    dispatch(setVisStyles(visStyles))
  }, [dispatch])

  if (!visForces || !visStyles) return null
  return (
    <div className={classes.root}>
      <div className={classes.alphaBar}>
        <div className={classes.alphaInner} />
      </div>
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
      <TextButton
        label="restart"
        style={{ width: '100%', marginBottom: 15 }}
        onClick={onRestart}
      />
      <label>file size coeff ({visStyles.files.radius.coeff})</label>
      <Slider
        min={0}
        max={50}
        step={1}
        value={visStyles.files.radius.coeff}
        onChange={(e, newVal) => {
          onChangeDisplay({
            ...visStyles,
            files: {
              ...visStyles.files,
              radius: {
                ...visStyles.files.radius,
                coeff: newVal,
              },
            },
          })
        }}
      />
      <label>file size exponent ({visStyles.files.radius.exponent})</label>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={visStyles.files.radius.exponent}
        onChange={(e, newVal) => {
          onChangeDisplay({
            ...visStyles,
            files: {
              ...visStyles.files,
              radius: {
                ...visStyles.files.radius,
                exponent: newVal,
              },
            },
          })
        }}
      />
      <label>
        file hue min/max ({visStyles.files.fill.hue[0]}/
        {visStyles.files.fill.hue[1]})
      </label>
      <Slider
        min={0}
        max={360}
        value={visStyles.files.fill.hue}
        onChange={(e, newVal) => {
          onChangeDisplay({
            ...visStyles,
            files: {
              ...visStyles.files,
              fill: {
                ...visStyles.files.fill,
                hue: newVal,
              }
            },
          })
        }}
      />
      <label>file opacity ({visStyles.files.fill.alpha.toFixed(2)})</label>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={visStyles.files.fill.alpha}
        onChange={(e, newVal) => {
          onChangeDisplay({
            ...visStyles,
            files: {
              ...visStyles.files,
              fill: {
                ...visStyles.files.fill,
                alpha: newVal,
              },
            },
          })
        }}
      />
      <label>vis rotation ({visStyles.rotation})</label>
      <Slider
        min={0}
        max={360}
        value={visStyles.rotation}
        onChange={(e, newVal) => {
          onChangeDisplay({
            ...visStyles,
            rotation: newVal,
          })
        }}
      />
    </div>
  )
}

export default Controls
