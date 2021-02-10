import React, { useState, useEffect, useCallback, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { interpolate, checkerGradient } from 'services/utils'
import * as d3 from 'd3'

const CIRCLE_STROKE_WIDTH = 0
const SVG_CURSOR_STYLE = 'pointer'
const BAR_CURSOR_STYLE = 'pointer'

const useStyles = makeStyles((theme) => ({
  root: {
    height: ({ height }) => height,
    borderRadius: ({ height }) => height / 2,
    position: 'relative',
    overflow: 'hidden',
    background: ({ height }) =>
      checkerGradient({
        alpha: 0.1,
        size: 4,
        backgroundColor: theme.palette.background.paper,
      }),
    '& > svg': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      cursor: SVG_CURSOR_STYLE,
      overflow: 'visible',
      '& > circle': {
        fill: ({ handleColor }) => handleColor || theme.palette.text.primary,
        strokeWidth: CIRCLE_STROKE_WIDTH,
        cursor: BAR_CURSOR_STYLE,
      },
    },
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: ({ height }) => height / 2,
    background: ({ background }) => background,
  },
}))

const Slider = ({
  height = 14,
  value,
  onChange,
  range,
  handleColor,
  background = undefined,
}) => {
  const containerRef = useRef(null)
  const classes = useStyles({ height, handleColor, background })
  const [dimensions, setDimensions] = useState(null)
  const [svg, setSvg] = useState(null)
  const [circle, setCircle] = useState(null)

  const getValue = useCallback(
    (x) => {
      if (!range || !dimensions) return null

      const value = interpolate(
        x,
        [dimensions.height / 2, dimensions.width - dimensions.height / 2],
        range,
        true
      )

      const step = range[2]
      return typeof step === 'undefined'
        ? value
        : step * Math.round(value / step)
    },
    [range, dimensions]
  )

  const getX = useCallback(
    (xValue) => {
      if (!range || !dimensions) return null
      return interpolate(
        xValue,
        range,
        [dimensions.height / 2, dimensions.width - dimensions.height / 2],
        true
      )
    },
    [range, dimensions]
  )

  useEffect(() => {
    const container = containerRef.current
    const { offsetWidth: width, offsetHeight: height } = container
    setDimensions({ width, height })

    const svg = d3.select(container).append('svg')
    const circle = svg
      .append('circle')
      .attr('r', (height - CIRCLE_STROKE_WIDTH) / 2)
      .attr('cy', height / 2)
      .attr('cx', -2 * (height + CIRCLE_STROKE_WIDTH))

    setSvg(svg)
    setCircle(circle)

    return () => {
      container.innerHTML = ''
    }
  }, [])

  useEffect(() => {
    if (!svg) return

    svg.on('click', ({ offsetX }) => onChange(getValue(offsetX)))

    return () => {
      svg.on('click', null)
    }
  }, [svg, getValue, onChange])

  useEffect(() => {
    if (!svg || !circle) return

    circle.call(
      d3
        .drag()
        .on('start', () => svg.style('cursor', BAR_CURSOR_STYLE))
        .on('drag', ({ x }) => onChange(getValue(x)))
        .on('end', () => svg.style('cursor', SVG_CURSOR_STYLE))
    )

    return () => {
      circle.on('mousedown.drag', null)
    }
  }, [svg, circle, getValue, onChange])

  useEffect(() => {
    if (!circle) return

    circle.attr('cx', getX(value))
  }, [value, circle, getX])

  return (
    <div ref={containerRef} className={classes.root}>
      <div className={classes.background} />
    </div>
  )
}

export default Slider
