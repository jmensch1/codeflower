import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SmartSlider } from 'components/core/Slider'
import ColorPicker from 'components/core/ColorPicker'
import { useVisStyles } from 'store/selectors'
import { setVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'
import Row from '../Row'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const LinkControls = () => {
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
      <Row label='stroke' level={1}>
        <ColorPicker
          label='color'
          obj={visStyles}
          path='links.stroke'
          onChange={onChangeStyles}
        />
      </Row>
      <Row label='width' level={1}>
        <SmartSlider
          label='width'
          range={[0, 10, 0.5]}
          obj={visStyles}
          path='links.strokeWidth'
          onChange={onChangeStyles}
        />
      </Row>
    </div>
  )
}

export default LinkControls
