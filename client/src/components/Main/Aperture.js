// NOTE: parent component must be relatively positioned

import React, { useRef, useEffect, useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { updateCamera } from 'store/actions/camera'
import { useCamera } from 'store/selectors'
import useSize from 'hooks/useSize'
import { delay } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
  },
  aperture: {
    border: `1px ${theme.palette.text.primary} dashed`,
    position: 'absolute',
  },
  blocker: {
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.8,
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

// returns the dimensions of the largest possible rectangle,
// with the given aspect ratio, that fits within the given containerRect.
// Values are expressed in the screen coordinate system and are relative
// to the containerRect.
function getAperture(containerRect, aspectRatio) {
  const {
    width: containerWidth,
    height: containerHeight,
  } = containerRect

  const containerAspectRatio = containerWidth / containerHeight

  const { width, height } = containerAspectRatio > aspectRatio
    ? {
      width: aspectRatio / containerAspectRatio,
      height: 1,
    } : {
      width: 1,
      height: containerAspectRatio / aspectRatio
    }

  const left = (1 - width) / 2
  const top = (1 - height) / 2

  return {
    left: left * containerWidth,
    top: top * containerHeight,
    width: width * containerWidth,
    height: height * containerHeight,
  }
}

// converts the given aperture to the svg's viewBox coordinate system
export function getViewboxAperture(svg, aperture) {
  const { left, top, width, height } = aperture
  const matrix = svg.getCTM().inverse()

  // calc top-left corner of aperture
  const pt0 = svg.createSVGPoint()
  pt0.x = left
  pt0.y = top
  const svgPt0 = pt0.matrixTransform(matrix)

  // calc bottom-right corner
  const pt1 = svg.createSVGPoint()
  pt1.x = left + width
  pt1.y = top + height
  const svgPt1 = pt1.matrixTransform(matrix)

  return {
    left: svgPt0.x,
    top: svgPt0.y,
    width: svgPt1.x - svgPt0.x,
    height: svgPt1.y - svgPt0.y,
  }
}

const Aperture = () => {
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

  const content = useMemo(() => {
    if (!aperture || !showAperture) return null

    const { left, top, width, height } = aperture
    return (
      <>
        <div
          className={classes.aperture}
          style={{ left, top, width, height }}
        />
        <div
          className={classes.blocker}
          style={{ top: 0, bottom: 0, left: 0, width: left }}
        />
        <div
          className={classes.blocker}
          style={{ top: 0, bottom: 0, right: 0, width: left }}
        />
        <div
          className={classes.blocker}
          style={{ left: 0, right: 0, top: 0, height: top }}
        />
        <div
          className={classes.blocker}
          style={{ left: 0, right: 0, bottom: 0, height: top }}
        />
      </>
    )
  }, [aperture, showAperture, classes])

  return (
    <div className={classes.root} ref={containerRef}>
      <div className={classes.flash} ref={flashRef} />
      { content }
    </div>
  )
}

export default Aperture
