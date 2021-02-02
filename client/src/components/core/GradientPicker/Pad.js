import React, { useEffect, useState, useCallback, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'
import { clampBar, interpolate } from 'services/utils'

const CIRCLE_RADIUS = 8
const BAR_HEIGHT = 8
const SVG_CURSOR_STYLE = 'default'
const CIRCLE_CURSOR_STYLE = 'ew-resize'
const BAR_CURSOR_STYLE = 'move'

const useStyles = makeStyles({
  root: {
    height: '100%',
    position: 'relative',
    '& > svg': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      cursor: SVG_CURSOR_STYLE,
      '& > circle': {
        fill: 'transparent',
        stroke: ({ handleColor }) => handleColor,
        strokeWidth: 2,
        cursor: CIRCLE_CURSOR_STYLE,
      },
      '& > rect': {
        cursor: BAR_CURSOR_STYLE,
        fill: ({ handleColor }) => handleColor,
        fillOpacity: 0.6,
      },
    },
  },
})

const Pad = ({
  value,
  onChange,
  xRange,
  yRange,
  handleColor = 'hsla(0,0%,100%,1.0)',
}) => {
  const containerRef = useRef(null)
  const classes = useStyles({ handleColor })
  const [dimensions, setDimensions] = useState(null)
  const [svg, setSvg] = useState(null)
  const [circle0, setCircle0] = useState(null)
  const [circle1, setCircle1] = useState(null)
  const [bar, setBar] = useState(null)
  const valueRef = useRef(null)

  const getXValue = useCallback((x) => {
    if (!xRange || !dimensions) return null
    return interpolate(x, [0, dimensions.width], xRange, true)
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
    return interpolate(y, [dimensions.height, 0], yRange, true)
  }, [yRange, dimensions])

  const getY = useCallback((yValue) => {
    if (!yRange || !dimensions) return null
    return interpolate(yValue, yRange, [dimensions.height, 0])
  }, [yRange, dimensions])

  useEffect(() => {
    const container = containerRef.current

    setDimensions({
      width: container.offsetWidth,
      height: container.offsetHeight,
    })

    const svg = d3.select(container).append('svg')
    const circle0 = svg.append('circle').attr('r', CIRCLE_RADIUS)
    const circle1 = svg.append('circle').attr('r', CIRCLE_RADIUS)
    const bar = svg.append('rect')

    setSvg(svg)
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
        .on('start', () => svg.style('cursor', CIRCLE_CURSOR_STYLE))
        .on('drag', ({ x }) => {
          onChange({
            x: [getXValue(x), valueRef.current.x[1]],
            y: valueRef.current.y,
          })
        })
        .on('end', () => svg.style('cursor', SVG_CURSOR_STYLE))
    )
  }, [svg, circle0, getXValue, onChange])

  useEffect(() => {
    if (!circle1) return

    circle1.call(
      d3
        .drag()
        .on('start', () => svg.style('cursor', CIRCLE_CURSOR_STYLE))
        .on('drag', ({ x }) => {
          onChange({
            x: [valueRef.current.x[0], getXValue(x)],
            y: valueRef.current.y,
          })
        })
        .on('end', () => svg.style('cursor', SVG_CURSOR_STYLE))
    )
  }, [svg, circle1, getXValue, onChange])

  useEffect(() => {
    if (!bar) return

    bar.call(
      d3
        .drag()
        .on('start', () => svg.style('cursor', BAR_CURSOR_STYLE))
        .on('drag', ({ y, dx }) => {
          const [x1, x2] = clampBar(
            getUnclampedX(valueRef.current.x[0]) + dx,
            getUnclampedX(valueRef.current.x[1]) + dx,
            [0, dimensions.width],
          )
          onChange({
            x: [getXValue(x1), getXValue(x2)],
            y: getYValue(y),
          })
        })
        .on('end', () => svg.style('cursor', SVG_CURSOR_STYLE))
    )
  }, [svg, bar, getUnclampedX, getXValue, getYValue, onChange, dimensions])

  useEffect(() => {
    if (!value || !svg || !bar || !circle0 || !circle1) return

    valueRef.current = value

    const x1 = getX(value.x[0])
    const x2 = getX(value.x[1])
    const y = getY(value.y)

    circle0.attr('cx', x1).attr('cy', y)
    circle1.attr('cx', x2).attr('cy', y)

    const barLeft = Math.min(x1, x2) + CIRCLE_RADIUS
    const barRight = Math.max(x1, x2) - CIRCLE_RADIUS

    if (barRight >= barLeft) {
      bar
        .attr('x', barLeft)
        .attr('y', y - BAR_HEIGHT / 2)
        .attr('width', barRight - barLeft)
        .attr('height', BAR_HEIGHT)
        .attr('visibility', 'visible')
    } else {
      bar.attr('visibility', 'hidden')
    }

  }, [svg, circle0, circle1, bar, value, getX, getY])

  return (
    <div ref={containerRef} className={classes.root} />
  )
}

export default Pad
