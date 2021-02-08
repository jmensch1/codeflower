import React, { useEffect, useState, useCallback, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'
import { clampBar, interpolate, checkerGradient } from 'services/utils'

const CIRCLE_RADIUS = 8
const CIRCLE_STROKE_WIDTH = 2
const BAR_HEIGHT = 8
const SVG_CURSOR_STYLE = 'default'
const CIRCLE_CURSOR_STYLE = 'ew-resize'
const BAR_CURSOR_STYLE = 'move'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    padding: CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2,
    background: checkerGradient({
      alpha: 0.1,
      size: 4,
      backgroundColor: theme.palette.background.paper,
    }),
    borderRadius: CIRCLE_RADIUS,
  },
  svgContainer: {
    height: '100%',
    position: 'relative',
    '& > svg': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      cursor: SVG_CURSOR_STYLE,
      overflow: 'visible',
      zIndex: 2,
      '& > circle': {
        fill: 'transparent',
        stroke: ({ handleColor }) => handleColor,
        strokeWidth: CIRCLE_STROKE_WIDTH,
        cursor: CIRCLE_CURSOR_STYLE,
      },
      '& > rect': {
        cursor: BAR_CURSOR_STYLE,
        fill: ({ handleColor }) => handleColor,
      },
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      background: ({ background }) => background,
    }
  },
}))

const Pad = ({
  value,
  onChange,
  xRange,
  yRange,
  handleColor = 'hsla(0,0%,100%,1.0)',
  background = undefined,
}) => {
  const containerRef = useRef(null)
  const classes = useStyles({ handleColor, background })
  const [dimensions, setDimensions] = useState(null)
  const [svg, setSvg] = useState(null)
  const [circle0, setCircle0] = useState(null)
  const [circle1, setCircle1] = useState(null)
  const [bar, setBar] = useState(null)
  const valueRef = useRef(null)

  //// TRANFORMERS ////

  const getXValue = useCallback(
    (x) => {
      if (!xRange || !dimensions) return null
      return interpolate(x, [0, dimensions.width], xRange, true)
    },
    [xRange, dimensions]
  )

  const getX = useCallback(
    (xValue) => {
      if (!xRange || !dimensions) return null
      return interpolate(xValue, xRange, [0, dimensions.width], true)
    },
    [xRange, dimensions]
  )

  const getUnclampedX = useCallback(
    (xValue) => {
      if (!xRange || !dimensions) return null
      return interpolate(xValue, xRange, [0, dimensions.width])
    },
    [xRange, dimensions]
  )

  const getYValue = useCallback(
    (y) => {
      if (!yRange || !dimensions) return null
      return interpolate(y, [dimensions.height, 0], yRange, true)
    },
    [yRange, dimensions]
  )

  const getY = useCallback(
    (yValue) => {
      if (!yRange || !dimensions) return null
      return interpolate(yValue, yRange, [dimensions.height, 0])
    },
    [yRange, dimensions]
  )

  //// INITIALIZE ////

  useEffect(() => {
    const container = containerRef.current

    setDimensions({
      width: container.offsetWidth,
      height: container.offsetHeight,
    })

    const svg = d3.select(container).append('svg')
    const circle0 = svg.append('circle').attr('r', CIRCLE_RADIUS)
    const circle1 = svg.append('circle').attr('r', CIRCLE_RADIUS)
    const bar = svg.append('rect').attr('height', BAR_HEIGHT)

    setSvg(svg)
    setCircle0(circle0)
    setCircle1(circle1)
    setBar(bar)

    return () => {
      container.innerHTML = ''
    }
  }, [])

  //// CIRCLE DRAG HANDLERS ////

  useEffect(() => {
    if (!circle0 || !circle1) return

    const changeCursor = () => svg.style('cursor', CIRCLE_CURSOR_STYLE)
    const restoreCursor = () => svg.style('cursor', SVG_CURSOR_STYLE)

    const createDrag = (onDrag) =>
      d3
        .drag()
        .on('start', changeCursor)
        .on('drag', onDrag)
        .on('end', restoreCursor)

    const circle0Drag = createDrag(({ x }) => {
      onChange({
        x: [getXValue(x), valueRef.current.x[1]],
        y: valueRef.current.y,
      })
    })

    const circle1Drag = createDrag(({ x }) => {
      onChange({
        x: [valueRef.current.x[0], getXValue(x)],
        y: valueRef.current.y,
      })
    })

    circle0.call(circle0Drag)
    circle1.call(circle1Drag)
  }, [svg, circle0, circle1, getXValue, onChange])

  //// BAR DRAG HANDLER ////

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
            [0, dimensions.width]
          )
          onChange({
            x: [getXValue(x1), getXValue(x2)],
            y: getYValue(y),
          })
        })
        .on('end', () => svg.style('cursor', SVG_CURSOR_STYLE))
    )
  }, [svg, bar, getUnclampedX, getXValue, getYValue, onChange, dimensions])

  //// UPDATE ELEMENTS ////

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
        .attr('visibility', 'visible')
    } else {
      bar.attr('visibility', 'hidden')
    }
  }, [svg, circle0, circle1, bar, value, getX, getY])

  return (
    <div className={classes.root}>
      <div ref={containerRef} className={classes.svgContainer} />
    </div>
  )
}

export default Pad
