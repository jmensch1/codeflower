import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { cameraOn, cameraOff, flash } from 'store/actions/camera'
import Controls from './Controls'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Camera = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(cameraOn())
    return () => dispatch(cameraOff())
  }, [dispatch])

  const doFlash = useCallback(
    () => dispatch(flash()),
    [dispatch]
  )

  return (
    <div className={classes.root}>
      <Controls flash={doFlash} />
    </div>
  )
}

export default Camera
