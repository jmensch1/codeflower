import React, { useEffect, useState, useCallback, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'

const CIRCLE_RADIUS = 8
const BAR_HEIGHT = 8

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    position: 'relative',
    '& > svg': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      '& > rect': {
        cursor: 'move',
      },
      '& > circle': {
        fill: 'transparent',
        strokeWidth: 2,
        cursor: 'ew-resize',
      }
    }
  }
}))

function clamp(num, range) {
  let [min, max] = range
  if (max < min) [min, max] = [max, min]
  return Math.min(Math.max(num, min), max)
}

// clamps x1 and x2 within xRange while maintaining the distance between them
function clampBar(x1, x2, xRange) {
  const xDistance = x2 - x1

  x1 = clamp(x1, xRange)
  x2 = x1 + xDistance

  x2 = clamp(x2, xRange)
  x1 = x2 - xDistance

  return [x1, x2]
}

function interpolate(num, domain, range, useClamp = false) {
  const domainRatio = (num - domain[0]) / (domain[1] - domain[0])
  const targetValue = domainRatio * (range[1] - range[0]) + range[0]
  return useClamp ? clamp(targetValue, range) : targetValue
}

const Pad = ({ value, onChange, xRange, yRange }) => {
  const classes = useStyles()
  const [dimensions, setDimensions] = useState(null)
  const [circle0, setCircle0] = useState(null)
  const [circle1, setCircle1] = useState(null)
  const [bar, setBar] = useState(null)
  const valueRef = useRef(null)

  const getXValue = useCallback((x) => {
    if (!xRange || !dimensions) return null
    return interpolate(x, [0, dimensions.width], xRange)
  }, [xRange, dimensions])

  const getX = useCallback((xValue) => {
    if (!xRange || !dimensions) return null
    return interpolate(xValue, xRange, [0, dimensions.width], true)
  }, [xRange, dimensions])

  const getUnclampedX = useCallback((xValue) => {
    if (!xRange || !dimensions) return null
    return interpolate(xValue, xRange, [0, dimensions.width])
  }, [xRange, dimensions])

  const getYValue = useCallback((y) => {
    if (!yRange || !dimensions) return null
    return interpolate(y, [0, dimensions.height], yRange, true)
  }, [yRange, dimensions])

  const getY = useCallback((yValue) => {
    if (!yRange || !dimensions) return null
    return interpolate(yValue, yRange, [0, dimensions.height])
  }, [yRange, dimensions])

  useEffect(() => {
    const container = document.getElementById('double-hue-picker-container')

    setDimensions({
      width: container.offsetWidth,
      height: container.offsetHeight,
    })

    const svg = d3.select(container).append('svg')
    const circle0 = svg.append('circle').attr('r', CIRCLE_RADIUS)
    const circle1 = svg.append('circle').attr('r', CIRCLE_RADIUS)
    const bar = svg.append('rect')

    setCircle0(circle0)
    setCircle1(circle1)
    setBar(bar)

    return () => {
      container.innerHTML = ''
    }
  }, [])

  useEffect(() => {
    if (!circle0) return

    circle0.call(
      d3
        .drag()
        .on('drag', ({ x, y }) => {
          onChange({
            ...valueRef.current,
            x: [getXValue(x), valueRef.current.x[1]]
          })
        })
    )
  }, [circle0, getXValue, onChange])

  useEffect(() => {
    if (!circle1) return

    circle1.call(
      d3
        .drag()
        .on('drag', ({ x, y }) => {
          onChange({
            ...valueRef.current,
            x: [valueRef.current.x[0], getXValue(x)]
          })
        })
    )
  }, [circle1, getXValue, onChange])

  useEffect(() => {
    if (!bar) return

    bar.call(
      d3
        .drag()
        .on('drag', ({ y, dx }) => {
          const [x1, x2] = clampBar(
            getUnclampedX(valueRef.current.x[0]) + dx,
            getUnclampedX(valueRef.current.x[1]) + dx,
            [0, dimensions.width],
          )
          onChange({
            ...valueRef.current,
            x: [getXValue(x1), getXValue(x2)],
            y: getYValue(y),
          })
        })
    )
  }, [bar, getUnclampedX, getXValue, getYValue, onChange, dimensions])

  useEffect(() => {
    if (!value || !circle0) return

    valueRef.current = value

    const x1 = getX(value.x[0])
    const x2 = getX(value.x[1])
    const y = getY(value.y)

    circle0
      .attr('cx', x1)
      .attr('cy', y)
      .style('stroke', `hsla(0, 0%, 100%, 1.0)`)

    circle1
      .attr('cx', x2)
      .attr('cy', y)
      .style('stroke', `hsla(0, 0%, 100%, 1.0)`)

    const barLeft = x2 >= x1
      ? x1 + CIRCLE_RADIUS
      : x2 + CIRCLE_RADIUS

    const barRight = x2 >= x1
      ? x2 - CIRCLE_RADIUS
      : x1 - CIRCLE_RADIUS

    if (barRight >= barLeft) {
      bar
        .attr('x', barLeft)
        .attr('y', y - BAR_HEIGHT / 2)
        .attr('width', barRight - barLeft)
        .attr('height', BAR_HEIGHT)
        .style('fill', `hsla(0, 0%, 100%, 1.0)`)
        .attr('visibility', 'visible')
    } else {
      bar.attr('visibility', 'hidden')
    }

  }, [value, circle0, circle1, bar, getX, getY])

  return (
    <div id='double-hue-picker-container' className={classes.root} />
  )
}

export default Pad
