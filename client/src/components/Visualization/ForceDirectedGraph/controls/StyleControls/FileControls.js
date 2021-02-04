import React, { useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider, { SmartSlider } from 'components/core/Slider'
import ColorPicker from 'components/core/ColorPicker'
import { useVisStyles } from 'store/selectors'
import { setVisStyles, updateVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'
import GradientPicker from 'components/core/GradientPicker'
import { getPath } from 'services/utils'
import Row from '../Row'

const useStyles = makeStyles((theme) => ({
  root: {},
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

  const onUpdateStyles = useCallback((path, value) => {
    dispatch(updateVisStyles(path, value))
  }, [dispatch])

  const onChangeFileFill = useMemo(
    () => onUpdateStyles.bind(null, 'files.fill'),
    [onUpdateStyles]
  )

  if (!visStyles) return null
  return (
    <div className={classes.root}>
      <Row label='fill' level={1}>
        <GradientPicker
          color={getPath(visStyles, 'files.fill')}
          onChange={onChangeFileFill}
        />
      </Row>
      <Row label='radius' level={1}>
        <Slider
          label='coefficient'
          range={[1, 50, 1]}
          value={getPath(visStyles, 'files.radius.coeff')}
          onChange={onUpdateStyles.bind(null, 'files.radius.coeff')}
        />
        <SmartSlider
          label='exponent'
          range={[0, 1, 0.01]}
          obj={visStyles}
          path='files.radius.exponent'
          onChange={onChangeStyles}
        />
      </Row>
      <Row label='stroke' level={1}>
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
      </Row>
    </div>
  )
}

export default FileControls
