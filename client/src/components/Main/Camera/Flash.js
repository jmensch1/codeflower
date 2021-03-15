// NOTE: parent component must be relatively positioned

import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { updateCamera } from 'store/actions/camera'
import { delay } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    opacity: 0,
    transition: 'opacity 0.03s ease-out',
    pointerEvents: 'none',
  },
}))

const Flash = () => {
  const classes = useStyles()
  const flashRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      updateCamera({
        flash: async () => {
          flashRef.current.style.opacity = 0.5
          await delay(100)
          flashRef.current.style.opacity = 0
          await delay(300)
        },
      })
    )
  }, [dispatch])

  return <div className={classes.root} ref={flashRef} />
}

export default Flash
