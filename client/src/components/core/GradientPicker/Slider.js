import React, { useState, useEffect, useCallback, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { interpolate } from 'services/utils'
import * as d3 from 'd3'

const BAR_WIDTH = 10
const BAR_STROKE_WIDTH = 2
const SVG_CURSOR_STYLE = 'pointer'
const BAR_CURSOR_STYLE = 'pointer'

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
      '& > rect': {
        fill: 'transparent',
        stroke: ({ handleColor }) => handleColor,
        strokeWidth: BAR_STROKE_WIDTH,
        cursor: BAR_CURSOR_STYLE,
      },
    },
  },
})

const Slider = ({
  value,
  onChange,
  range,
  handleColor = 'hsla(0,0%,100%,1.0)',
}) => {
  const containerRef = useRef(null)
  const classes = useStyles({ handleColor })
  const [dimensions, setDimensions] = useState(null)
  const [svg, setSvg] = useState(null)
  const [bar, setBar] = useState(null)

  const getValue = useCallback((x) => {
    if (!range || !dimensions) return null
    return interpolate(x, [0, dimensions.width], range)
  }, [range, dimensions])

  const getX = useCallback((xValue) => {
    if (!range || !dimensions) return null
    return interpolate(xValue, range, [0, dimensions.width], true)
  }, [range, dimensions])

  useEffect(() => {
    const container = containerRef.current
    const { offsetWidth: width, offsetHeight: height } = container
    setDimensions({ width, height })

    const svg = d3.select(container).append('svg')
    const bar = svg
      .append('rect')
      .attr('height', height - BAR_STROKE_WIDTH)
      .attr('width', BAR_WIDTH)
      .attr('y', BAR_STROKE_WIDTH / 2)

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
    if (!value || !bar) return

    bar.attr('x', getX(value) - BAR_WIDTH / 2)
  }, [value, bar, getX])

  return (
    <div ref={containerRef} className={classes.root} />
  )
}

export default Slider
