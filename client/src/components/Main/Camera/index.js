// NOTE: parent component must be relatively positioned

import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { updateCamera } from 'store/actions/camera'
import { useCamera } from 'store/selectors'
import useSize from 'hooks/useSize'
import { delay } from 'services/utils'
import Aperture from './Aperture'
import { getAperture, getViewboxAperture } from './utils'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
  },
  flash: {
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

const Camera = () => {
  const { aspectRatio, showAperture } = useCamera()
  const [aperture, setAperture] = useState(null)
  const classes = useStyles()
  const containerRef = useRef(null)
  const containerRect = useSize(containerRef)
  const flashRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!containerRect) return

    const svg = document.querySelector('#vis-container')

    const screenAperture = aspectRatio
      ? getAperture(containerRect, aspectRatio)
      : {
        left: 0,
        top: 0,
        width: containerRect.width,
        height: containerRect.height
      }

    const viewboxAperture = getViewboxAperture(svg, screenAperture)

    const flash = async () => {
      flashRef.current.style.opacity = 0.5
      await delay(100)
      flashRef.current.style.opacity = 0
      await delay(300)
    }

    setAperture(screenAperture)
    dispatch(updateCamera({
      aperture: {
        screen: screenAperture,
        viewBox: viewboxAperture,
      },
      flash,
    }))
  }, [containerRect, aspectRatio, dispatch])

  return (
    <div className={classes.root} ref={containerRef}>
      <div className={classes.flash} ref={flashRef} />
      {aperture && showAperture && (
        <Aperture aperture={aperture} />
      )}
    </div>
  )
}

export default Camera
