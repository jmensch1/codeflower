import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useVisStyles } from 'store/selectors'
import { setVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'
import Checkbox from 'components/core/Checkbox'

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
      <Checkbox
        label='files visible'
        obj={visStyles}
        path='files.visible'
        onChange={onChangeStyles}
      />
      <Checkbox
        label='folders visible'
        obj={visStyles}
        path='folders.visible'
        onChange={onChangeStyles}
      />
      <Checkbox
        label='links visible'
        obj={visStyles}
        path='links.visible'
        onChange={onChangeStyles}
      />
    </div>
  )
}

export default StyleControls
