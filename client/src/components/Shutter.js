// NOTE: parent component must be relatively positioned

import React, { useRef, useEffect, useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useCamera } from 'store/selectors'
import useSize from 'hooks/useSize'

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
    pointerEvents: 'none',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: ({ flashOn }) =>
        flashOn ? `hsla(0,0%,100%,0.5)` : `hsla(0,0%,100%,0)`,
      transition: 'background-color 0.1s ease-out',
    }
  },
  blocker: {
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.8,
  }
}))

function getAperture(containerWidth, containerHeight, aspect) {
  const containerAspect = containerWidth / containerHeight

  const { width, height } = containerAspect > aspect
    ? {
      width: aspect / containerAspect,
      height: 1,
    } : {
      width: 1,
      height: containerAspect / aspect
    }

  const x = (1 - width) / 2
  const y = (1 - height) / 2

  return {
    x: x * containerWidth,
    y: y * containerHeight,
    width: width * containerWidth,
    height: height * containerHeight,
  }
}

const Shutter = () => {
  const { flashOn, aspectRatio } = useCamera()
  const [aperture, setAperture] = useState(null)
  const classes = useStyles({ flashOn })
  const container = useRef(null)
  const dimensions = useSize(container)

  useEffect(() => {
    if (!dimensions) return

    const { width, height } = dimensions

    const aperture = aspectRatio
      ? getAperture(width, height, aspectRatio)
      : { x: 0, y: 0, width, height }

    setAperture(aperture)
  }, [dimensions, aspectRatio])

  const content = useMemo(() => {
    if (!aperture) return null

    const { x: left, y: top, width, height } = aperture
    return (
      <>
        <div
          className={classes.aperture}
          style={{ left, top, width, height }}
        />
        <div
          className={classes.blocker}
          style={{
            top: 0,
            bottom: 0,
            left: 0,
            width: left,
          }}
        />
        <div
          className={classes.blocker}
          style={{
            top: 0,
            bottom: 0,
            right: 0,
            width: left,
          }}
        />
        <div
          className={classes.blocker}
          style={{
            left: 0,
            right: 0,
            top: 0,
            height: top,
          }}
        />
        <div
          className={classes.blocker}
          style={{
            left: 0,
            right: 0,
            bottom: 0,
            height: top,
          }}
        />
      </>
    )
  }, [aperture, classes])

  return (
    <div className={classes.root} ref={container}>
      { content }
    </div>
  )
}

export default Shutter
