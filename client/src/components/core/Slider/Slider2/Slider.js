import React, { useState, useEffect, useCallback, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { interpolate, checkerGradient } from 'services/utils'
import * as d3 from 'd3'

const CIRCLE_STROKE_WIDTH = 4
const SVG_CURSOR_STYLE = 'pointer'
const BAR_CURSOR_STYLE = 'pointer'

const useStyles = makeStyles(theme => ({
  root: {
    height: ({ height }) => height,
    borderRadius: ({ height }) => height / 2,
    position: 'relative',
    background: checkerGradient({
      alpha: 0.1,
      size: 10,
      backgroundColor: theme.palette.background.paper
    }),
    '& > svg': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      cursor: SVG_CURSOR_STYLE,
      '& > circle': {
        fill: 'transparent',
        stroke: ({ handleColor }) => handleColor || theme.palette.text.primary,
        strokeWidth: CIRCLE_STROKE_WIDTH,
        cursor: BAR_CURSOR_STYLE,
      },
    },
  },
}))

const Slider = ({
  height = 16,
  value,
  onChange,
  range,
  handleColor,
}) => {
  const containerRef = useRef(null)
  const classes = useStyles({ height, handleColor })
  const [dimensions, setDimensions] = useState(null)
  const [svg, setSvg] = useState(null)
  const [bar, setBar] = useState(null)

  const getValue = useCallback((x) => {
    if (!range || !dimensions) return null
    const value = interpolate(x, [dimensions.height / 2, dimensions.width - dimensions.height / 2], range, true)
    const step = range[2] || 1
    return step * Math.round(value / step)
  }, [range, dimensions])

  const getX = useCallback((xValue) => {
    if (!range || !dimensions) return null
    return interpolate(xValue, range, [dimensions.height / 2, dimensions.width - dimensions.height / 2], true)
  }, [range, dimensions])

  useEffect(() => {
    const container = containerRef.current
    const { offsetWidth: width, offsetHeight: height } = container
    setDimensions({ width, height })

    const svg = d3.select(container).append('svg')
    const bar = svg
      .append('circle')
      .attr('r', (height - CIRCLE_STROKE_WIDTH) / 2)
      .attr('cy', height / 2)
      .attr('cx', -height) // invisible until calculated below to avoid flash

    setSvg(svg)
    setBar(bar)

    return () => {
      container.innerHTML = ''
    }
  }, [])

  useEffect(() => {
    if (!svg) return

    svg.on('click', ({ offsetX }) => onChange(getValue(offsetX)))
  }, [svg, getValue, onChange])

  useEffect(() => {
    if (!svg || !bar) return

    bar.call(
      d3
        .drag()
        .on('start', () => svg.style('cursor', BAR_CURSOR_STYLE))
        .on('drag', ({ x }) => onChange(getValue(x)))
        .on('end', () => svg.style('cursor', SVG_CURSOR_STYLE))
    )
  }, [svg, bar, getValue, onChange])

  useEffect(() => {
    if (!bar) return

    bar.attr('cx', getX(value))
  }, [value, bar, getX])

  return (
    <div ref={containerRef} className={classes.root} />
  )
}

export default Slider
