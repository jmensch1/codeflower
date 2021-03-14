// NOTE: parent component must be relatively positioned

import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { updateCamera } from 'store/actions/camera'
import { useCamera } from 'store/selectors'
import useSize from 'hooks/useSize'
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
}))

const CameraCore = () => {
  const { aspectRatio } = useCamera()
  const [aperture, setAperture] = useState(null)
  const classes = useStyles()
  const containerRef = useRef(null)
  const containerRect = useSize(containerRef)
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

    setAperture(screenAperture)
    dispatch(updateCamera({
      aperture: {
        screen: screenAperture,
        viewBox: viewboxAperture,
      },
    }))
  }, [containerRect, aspectRatio, dispatch])

  return (
    <div className={classes.root} ref={containerRef}>
      {aperture && (
        <Aperture aperture={aperture} />
      )}
    </div>
  )
}

export default CameraCore
