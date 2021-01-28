import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SmartSlider } from 'components/core/Slider'
import ColorPicker from 'components/core/ColorPicker'
import { useVisStyles } from 'store/selectors'
import { setVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    '& > *': {
      marginBottom: 10,
    }
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
      <ColorPicker
        label='folder color'
        obj={visStyles}
        path='folders.fill'
        onChange={onChangeStyles}
      />
      <SmartSlider
        label='folder radius'
        range={[1, 20, 0.5]}
        obj={visStyles}
        path='folders.radius'
        onChange={onChangeStyles}
      />
      <ColorPicker
        label='folder stroke color'
        obj={visStyles}
        path='folders.stroke'
        onChange={onChangeStyles}
      />
      <SmartSlider
        label='folder stroke width'
        range={[0, 10, 0.5]}
        obj={visStyles}
        path='folders.strokeWidth'
        onChange={onChangeStyles}
      />
    </div>
  )
}

export default StyleControls
