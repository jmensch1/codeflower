import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ColorPicker from 'components/core/ColorPicker'
import { useVisStyles } from 'store/selectors'
import { setVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    '& > *': {
      marginBottom: 20,
    }
  },
}))

const ColorControls = () => {
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
        label='file fill'
        obj={visStyles}
        path='files.fill'
        onChange={onChangeStyles}
      />
      <ColorPicker
        label='file stroke'
        obj={visStyles}
        path='files.stroke'
        onChange={onChangeStyles}
      />
      <ColorPicker
        label='folder fill'
        obj={visStyles}
        path='folders.fill'
        onChange={onChangeStyles}
      />
      <ColorPicker
        label='folder stroke'
        obj={visStyles}
        path='folders.stroke'
        onChange={onChangeStyles}
      />
    </div>
  )
}

export default ColorControls
