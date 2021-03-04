// NOTE: parent component must be relatively positioned

import React, { useRef, useEffect, useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { updateCamera } from 'store/actions/camera'
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

// returns the aperture in svg coordinates, and ratio between the
// two coordinate systems
export function getSvgDimensions(svg, aperture) {
  const { x, y, width, height } = aperture
  const matrix = svg.getCTM().inverse()

  // top-left corner of svg
  const pt0 = svg.createSVGPoint()
  pt0.x = x
  pt0.y = y
  const svgPt0 = pt0.matrixTransform(matrix)

  // bottom-right corner
  const pt1 = svg.createSVGPoint()
  pt1.x = x + width
  pt1.y = y + height
  const svgPt1 = pt1.matrixTransform(matrix)

  const viewBox = {
    left: svgPt0.x,
    top: svgPt0.y,
    width: svgPt1.x - svgPt0.x,
    height: svgPt1.y - svgPt0.y,
  }

  return {
    viewBox,
    ratio: viewBox.width / width,
  }
}

const Shutter = () => {
  const { flashOn, aspectRatio } = useCamera()
  const [aperture, setAperture] = useState(null)
  const classes = useStyles({ flashOn })
  const container = useRef(null)
  const dimensions = useSize(container)
  const [svg, setSvg] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    setSvg(document.querySelector('#fdg-container svg'))
  }, [])

  useEffect(() => {
    if (!dimensions || !svg) return

    const { width, height } = dimensions

    const aperture = aspectRatio
      ? getAperture(width, height, aspectRatio)
      : { x: 0, y: 0, width, height }

    const svgDimensions = getSvgDimensions(svg, aperture)
    svgDimensions.screen = aperture

    setAperture(aperture)
    dispatch(updateCamera({ svgDimensions }))
  }, [svg, dimensions, aspectRatio, dispatch])

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
