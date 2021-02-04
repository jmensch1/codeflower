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
      marginBottom: 10,
    },
  },
}))

const FolderControls = () => {
  const classes = useStyles()
  const visStyles = useVisStyles()
  const dispatch = useDispatch()

  const onChangeStyles = useCallback(
    (visStyles) => {
      dispatch(
        setVisStyles({
          ...visStyles,
          id: undefined,
        })
      )
    },
    [dispatch]
  )

  if (!visStyles) return null
  return (
    <div className={classes.root}>
      <ColorPicker
        label="fill: color"
        obj={visStyles}
        path="folders.fill"
        onChange={onChangeStyles}
      />
      <SmartSlider
        label="fill: opacity"
        range={[0, 1, 0.01]}
        obj={visStyles}
        path="folders.fill.alpha"
        onChange={onChangeStyles}
        gradient="opacity"
      />
      <SmartSlider
        label="radius"
        range={[1, 20, 0.5]}
        obj={visStyles}
        path="folders.radius"
        onChange={onChangeStyles}
      />
      <ColorPicker
        label="stroke: color"
        obj={visStyles}
        path="folders.stroke"
        onChange={onChangeStyles}
      />
      <SmartSlider
        label="stroke: opacity"
        range={[0, 1, 0.01]}
        obj={visStyles}
        path="folders.stroke.alpha"
        onChange={onChangeStyles}
        gradient="opacity"
      />
      <SmartSlider
        label="stroke: width"
        range={[0, 10, 0.5]}
        obj={visStyles}
        path="folders.strokeWidth"
        onChange={onChangeStyles}
      />
    </div>
  )
}

export default FolderControls
