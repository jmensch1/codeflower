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

const LinkControls = () => {
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
        label="color"
        obj={visStyles}
        path="links.stroke"
        onChange={onChangeStyles}
      />
      <SmartSlider
        label="opacity"
        range={[0, 1, 0.01]}
        obj={visStyles}
        path="links.stroke.alpha"
        onChange={onChangeStyles}
        gradient="opacity"
      />
      <SmartSlider
        label="width"
        range={[0, 10, 0.5]}
        obj={visStyles}
        path="links.strokeWidth"
        onChange={onChangeStyles}
      />
    </div>
  )
}

export default LinkControls
