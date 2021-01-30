import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SmartSlider } from 'components/core/Slider'
import ColorPicker from 'components/core/ColorPicker'
import { useVisStyles } from 'store/selectors'
import { setVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: '0.5em',
    }
  },
}))

const FileControls = () => {
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
      <ColorPicker
        label='fill: colors'
        obj={visStyles}
        path='files.fill'
        onChange={onChangeStyles}
      />
      <SmartSlider
        label='fill: opacity'
        range={[0, 1, 0.01]}
        obj={visStyles}
        path='files.fill.alpha'
        onChange={onChangeStyles}
        gradient='opacity'
      />
      <SmartSlider
        label='radius: coefficient'
        range={[1, 50, 1]}
        obj={visStyles}
        path='files.radius.coeff'
        onChange={onChangeStyles}
      />
      <SmartSlider
        label='radius: exponent'
        range={[0, 1, 0.01]}
        obj={visStyles}
        path='files.radius.exponent'
        onChange={onChangeStyles}
      />
      <ColorPicker
        label='stroke: color'
        obj={visStyles}
        path='files.stroke'
        onChange={onChangeStyles}
      />
      <SmartSlider
        label='stroke: opacity'
        range={[0, 1, 0.01]}
        obj={visStyles}
        path='files.stroke.alpha'
        onChange={onChangeStyles}
        gradient='opacity'
      />
      <SmartSlider
        label='stroke: width'
        range={[0, 10, 0.5]}
        obj={visStyles}
        path='files.strokeWidth'
        onChange={onChangeStyles}
      />
    </div>
  )
}

export default FileControls
