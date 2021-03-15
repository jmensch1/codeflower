// NOTE: parent component must be relatively positioned

import React, { useRef, useEffect, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { updateCamera } from 'store/actions/camera'
import { useCamera } from 'store/selectors'
import useSize from 'hooks/useSize'
import Aperture from './Aperture'
import ImageMaker from './ImageMaker'
import { getAperture, getViewBoxAperture } from './utils'

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
  // TODO: maybe set up separate selectors for useCamera
  // to prevent unnecessary re-rendering
  const { aspectRatio } = useCamera()
  const classes = useStyles()
  const containerRef = useRef(null)
  const containerRect = useSize(containerRef)
  const dispatch = useDispatch()

  const svg = useMemo(() => document.querySelector('#vis-container'), [])

  const aperture = useMemo(() => {
    if (!containerRect) return null

    const screenAperture = aspectRatio
      ? getAperture(containerRect, aspectRatio)
      : {
          left: 0,
          top: 0,
          width: containerRect.width,
          height: containerRect.height,
        }

    const viewBoxAperture = getViewBoxAperture(svg, screenAperture)

    return {
      screen: screenAperture,
      viewBox: viewBoxAperture,
    }
  }, [svg, containerRect, aspectRatio])

  useEffect(() => {
    dispatch(updateCamera({ aperture }))
  }, [dispatch, aperture])

  return (
    <div className={classes.root} ref={containerRef}>
      {aperture && (
        <>
          <Aperture aperture={aperture.screen} />
          <ImageMaker svg={svg} aperture={aperture} />
        </>
      )}
    </div>
  )
}

export default CameraCore
