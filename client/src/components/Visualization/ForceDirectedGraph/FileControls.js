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
      marginBottom: 14,
      // '&:after': {
      //   content: '""',
      //   display: 'block',
      //   height: 1,
      //   backgroundColor: theme.palette.divider,
      //   margin: '6px 0',
      // }
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
        label='colors'
        obj={visStyles}
        path='files.fill'
        onChange={onChangeStyles}
      />
      <SmartSlider
        label='opacity'
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
    </div>
  )
}

export default FileControls
