import React, { useEffect, useState, useCallback, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'
import { interpolate, checkerGradient, hueGradient, alphaGradient } from 'services/utils'
import tinycolor from 'tinycolor2'

const CIRCLE_RADIUS = 8
const CIRCLE_STROKE_WIDTH = 2
const SVG_CURSOR_STYLE = 'pointer'
const CIRCLE_CURSOR_STYLE = 'pointer'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    padding: CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2,
    background: checkerGradient({
      alpha: 0.05,
      size: CIRCLE_RADIUS /2,
      backgroundColor: theme.palette.background.paper,
    }),
    borderRadius: CIRCLE_RADIUS,
  },
  svgContainer: {
    height: '100%',
    position: 'relative',
    background: `
      ${alphaGradient({
        alphaMin: 0,
        alphaMax: 1,
        saturation: 0,
        lightness: tinycolor(theme.palette.background.paper).toHsl().l * 100,
        direction: 'bottom',
      })}
      ,
      ${hueGradient({
        hueMin: 0,
        hueMax: 360,
        saturation: 100,
        lightness: 50,
      })}
    `,
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: checkerGradient({
        alpha: 0.05,
        backgroundColor: theme.palette.background.paper,
        size: CIRCLE_RADIUS /2,
      }),
    },
    // background: `
    //   linear-gradient(
    //     to bottom,
    //       rgb(0, 0, 0),
    //       rgba(0, 0, 0, 0)
    //   )
    // `,
    '& > svg': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: 1,
      overflow: 'visible',
      cursor: SVG_CURSOR_STYLE,
      '& > circle': {
        fill: 'transparent',
        stroke: ({ handleColor }) => handleColor,
        strokeWidth: CIRCLE_STROKE_WIDTH,
        cursor: CIRCLE_CURSOR_STYLE,
      },
    },
  },
}))

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
  const [circle, setCircle] = useState(null)

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
    const circle = svg
      .append('circle')
      .attr('r', CIRCLE_RADIUS)
      .attr('cx', -CIRCLE_RADIUS)
      .attr('cy', -CIRCLE_RADIUS)

    setSvg(svg)
    setCircle(circle)

    return () => {
      container.innerHTML = ''
    }
  }, [])

  //// CIRCLE DRAG HANDLER ////

  useEffect(() => {
    if (!circle) return

    const changeCursor = () => svg.style('cursor', CIRCLE_CURSOR_STYLE)
    const restoreCursor = () => svg.style('cursor', SVG_CURSOR_STYLE)

    const createDrag = (onDrag) =>
      d3
        .drag()
        .on('start', changeCursor)
        .on('drag', onDrag)
        .on('end', restoreCursor)

    const circleDrag = createDrag(({ x, y }) => {
      onChange({
        x: getXValue(x),
        y: getYValue(y),
      })
    })

    circle.call(circleDrag)

    return () => {
      circle.on('mousedown.drag', null)
    }
  }, [svg, circle, getXValue, getYValue, onChange])

  //// CLICK HANDLER ////

  useEffect(() => {
    if (!svg) return

    svg.on('click', ({ offsetX, offsetY }) =>
      onChange({
        x: getXValue(offsetX),
        y: getYValue(offsetY),
      })
    )

    return () => {
      svg.on('click', null)
    }
  }, [svg, getXValue, getYValue, onChange])

  //// UPDATE ELEMENTS ////

  useEffect(() => {
    if (!value || !circle) return

    circle
      .attr('cx', getX(value.x))
      .attr('cy', getY(value.y))
  }, [circle, value, getX, getY])

  return (
    <div className={classes.root}>
      <div ref={containerRef} className={classes.svgContainer} />
    </div>
  )
}

export default Pad
