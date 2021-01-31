import React, { useEffect, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'

const CIRCLE_RADIUS = 8

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
      '& > line': {
        stroke: 'black',
        strokeWidth: 4,
        cursor: 'move',
      },
      '& > circle': {
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 1,
        cursor: 'ew-resize',
      }
    }
  }
}))

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max)
}

function interpolate(num, numRange, targetRange) {
  const numRangeRatio = (num - numRange[0]) / (numRange[1] - numRange[0])
  const targetValue = numRangeRatio * (targetRange[1] - targetRange[0]) + targetRange[0]
  return clamp(targetValue, targetRange[0], targetRange[1])
}

const Pad = ({ color, onChange, hueRange, lightnessRange }) => {
  const classes = useStyles()
  const [dimensions, setDimensions] = useState(null)
  const [circle0, setCircle0] = useState(null)
  const [circle1, setCircle1] = useState(null)
  const [bar, setBar] = useState(null)

  const getHue = useCallback((x) => {
    if (!hueRange || !dimensions) return null
    return interpolate(x, [0, dimensions.width], hueRange)
  }, [hueRange, dimensions])

  const getX = useCallback((hue) => {
    if (!hueRange || !dimensions) return null
    return interpolate(hue, hueRange, [0, dimensions.width])
  }, [hueRange, dimensions])

  const getLightness = useCallback((y) => {
    if (!lightnessRange || !dimensions) return null
    return interpolate(y, [0, dimensions.height], lightnessRange)
  }, [lightnessRange, dimensions])

  const getY = useCallback((lightness) => {
    if (!lightnessRange || !dimensions) return null
    return interpolate(lightness, lightnessRange, [0, dimensions.height])
  }, [lightnessRange, dimensions])

  useEffect(() => {
    const container = document.getElementById('double-hue-picker-container')

    setDimensions({
      width: container.offsetWidth,
      height: container.offsetHeight,
    })

    const svg = d3
      .select(container)
      .append('svg')

    const circle0 = svg
      .append('circle')
      .attr('r', CIRCLE_RADIUS)

    const circle1 = svg
      .append('circle')
      .attr('r', CIRCLE_RADIUS)

    const bar = svg
      .append('line')

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
          onChange((color) => ({
            ...color,
            hue: [getHue(x), color.hue[1]]
          }))
        })
    )
  }, [circle0, getHue, onChange])

  useEffect(() => {
    if (!circle1) return

    circle1.call(
      d3
        .drag()
        .on('drag', ({ x, y }) => {
          onChange((color) => ({
            ...color,
            hue: [color.hue[0], getHue(x)]
          }))
        })
    )
  }, [circle1, getHue, onChange])

  useEffect(() => {
    if (!bar) return

    bar.call(
      d3
        .drag()
        .on('drag', ({ x, y }) => {
          onChange((color) => ({
            ...color,
            lightness: getLightness(y),
          }))
        })
    )
  }, [bar, getLightness, onChange])

  useEffect(() => {
    if (!color || !circle0) return

    const x1 = getX(color.hue[0])
    const x2 = getX(color.hue[1])
    const y = getY(color.lightness)

    circle0.attr('cx', x1).attr('cy', y)
    circle1.attr('cx', x2).attr('cy', y)

    const barLeft = x2 >= x1
      ? x1 + CIRCLE_RADIUS
      : x2 + CIRCLE_RADIUS

    const barRight = x2 >= x1
      ? x2 - CIRCLE_RADIUS
      : x1 - CIRCLE_RADIUS

    if (barRight >= barLeft)
      bar
        .attr('x1', barLeft)
        .attr('x2', barRight)
        .attr('y1', y)
        .attr('y2', y)
        .attr('visibility', 'visible')
    else
      bar.attr('visibility', 'hidden')

  }, [color, circle0, circle1, bar, getX, getY])

  return (
    <div id='double-hue-picker-container' className={classes.root} />
  )
}

export default Pad
