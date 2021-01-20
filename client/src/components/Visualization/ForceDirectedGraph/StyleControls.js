import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider, { SmartSlider } from 'components/core/Slider'
import { useVisStyles } from 'store/selectors'
import { setVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
}))

const StyleControls = () => {
  const classes = useStyles()
  const visStyles = useVisStyles()
  const dispatch = useDispatch()

  const onChangeStyles = useCallback((visStyles) => {
    dispatch(setVisStyles(visStyles))
  }, [dispatch])

  if (!visStyles) return null
  return (
    <div className={classes.root}>
      <label>file size coeff ({visStyles.files.radius.coeff})</label>
      <Slider
        min={0}
        max={50}
        step={1}
        value={visStyles.files.radius.coeff}
        onChange={(e, newVal) => {
          onChangeStyles({
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
          onChangeStyles({
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
          onChangeStyles({
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
      <SmartSlider
        range={[0, 1, 0.01]}
        obj={visStyles}
        path='files.fill.alpha'
        onChange={onChangeStyles}
      />
      <label>vis rotation ({visStyles.rotation})</label>
      <Slider
        min={0}
        max={360}
        value={visStyles.rotation}
        onChange={(e, newVal) => {
          onChangeStyles({
            ...visStyles,
            rotation: newVal,
          })
        }}
      />
    </div>
  )
}

export default StyleControls
