import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SmartSlider } from 'components/core/Slider'
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
    dispatch(setVisStyles({
      ...visStyles,
      id: undefined,
    }))
  }, [dispatch])

  if (!visStyles) return null
  return (
    <div className={classes.root}>
      <SmartSlider
        label='file size: coefficient'
        range={[1, 50, 1]}
        obj={visStyles}
        path='files.radius.coeff'
        onChange={onChangeStyles}
      />
      <SmartSlider
        label='file size: exponent'
        range={[0, 1, 0.01]}
        obj={visStyles}
        path='files.radius.exponent'
        onChange={onChangeStyles}
      />
      <SmartSlider
        label='file hue min/max'
        range={[0, 360, 1]}
        obj={visStyles}
        path='files.fill.hue'
        onChange={onChangeStyles}
        gradient='hue'
      />
      <SmartSlider
        label='file saturation min/max'
        range={[0, 100, 1]}
        obj={visStyles}
        path='files.fill.saturation'
        onChange={onChangeStyles}
      />
      <SmartSlider
        label='file lightness min/max'
        range={[0, 100, 1]}
        obj={visStyles}
        path='files.fill.lightness'
        onChange={onChangeStyles}
        gradient='lightness'
      />
      <SmartSlider
        label='file opacity'
        range={[0, 1, 0.01]}
        obj={visStyles}
        path='files.fill.alpha'
        onChange={onChangeStyles}
        gradient='opacity'
      />
      <SmartSlider
        label='rotation'
        range={[0, 360, 1]}
        obj={visStyles}
        path='rotation'
        onChange={onChangeStyles}
      />
    </div>
  )
}

export default StyleControls
