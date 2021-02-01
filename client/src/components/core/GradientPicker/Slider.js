import React, { useState, useEffect, useCallback, useRef } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { hueGradient, interpolate } from 'services/utils'
import * as d3 from 'd3'

const BAR_WIDTH = 10
const STROKE_WIDTH = 2

const lightnessGradient = 'linear-gradient(-90deg, hsla(0,0%,100%,1) 0%, hsla(0,0%,100%,0) 50%, hsla(0,0%,0%,0) 50%, hsla(0,0%,0%,1) 100%)'
const saturationGradient = 'linear-gradient(90deg, hsla(0,0%,50%,1), hsla(0,0%,50%,0))'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 20,
    position: 'relative',
    '& > svg': {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      '& > rect': {
        fill: 'transparent',
        stroke: 'white',
        strokeWidth: STROKE_WIDTH,
        cursor: 'pointer',
      },
    },
  },
  lightness: {
    backgroundImage: ({ color }) => `${lightnessGradient}, ${hueGradient({
      hueMin: color.hue[0],
      hueMax: color.hue[1],
      saturation: 100,
      lightness: 50,
      alpha: color.alpha,
      steps: 20,
      direction: 'bottom',
    })}`,
  },
  saturation: {
    backgroundImage: ({ color }) => `${saturationGradient}, ${hueGradient({
      hueMin: color.hue[0],
      hueMax: color.hue[1],
      saturation: 100,
      lightness: 50,
      alpha: color.alpha,
      steps: 20,
      direction: 'bottom',
    })}`,
  }
}))

const Slider = ({ color, value, onChange, range, gradient }) => {
  const classes = useStyles({ color })
  const [dimensions, setDimensions] = useState(null)
  const [bar, setBar] = useState(null)
  const containerRef = useRef(null)

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
      .attr('height', height - STROKE_WIDTH)
      .attr('width', BAR_WIDTH)
      .attr('y', STROKE_WIDTH / 2)

    setBar(bar)

    return () => {
      container.innerHTML = ''
    }
  }, [])

  useEffect(() => {
    if (!bar) return

    bar.call(
      d3
        .drag()
        .on('drag', ({ x }) => {
          onChange(getValue(x))
        })
    )
  }, [bar, getValue, onChange])

  useEffect(() => {
    if (!value || !bar) return

    bar.attr('x', getX(value) - BAR_WIDTH / 2)
  }, [value, bar, getX])

  return (
    <div
      ref={containerRef}
      className={clsx(classes.root, classes[gradient])}
    />
  )
}

export default Slider
