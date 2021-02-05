import React, { useState, useEffect, useRef, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SinglePad from './SinglePad'
import tinycolor from 'tinycolor2'
import Slider from 'components/core/Slider'
import Background from './Background'

const HUE_RANGE = [0, 360, 1]
const SATURATION_RANGE = [0, 1]
const VALUE_RANGE = [0, 1]
const ALPHA_RANGE = [0, 1, 0.01]

const useStyles = makeStyles(theme => ({
  root: {},
}))

function hslaToHsva(hsla) {
  const { hue: h, saturation: s, lightness: l, alpha: a } = hsla
  return tinycolor(`hsla(${h}, ${s}%, ${l}%, ${a})`).toHsv()
}

function hsvaToHsla(hsva) {
  const { h, s, v, a } = hsva
  const hsla = tinycolor(`hsva(${h}, ${s * 100}%, ${v * 100}%, ${a})`).toHsl()
  return {
    hue: hsla.h,
    saturation: hsla.s * 100,
    lightness: hsla.l * 100,
    alpha: hsla.a,
  }
}

const ColorPicker = ({ color, onChange }) => {
  const classes = useStyles()
  const [point, setPoint] = useState(null)
  const initialRun = useRef(true)
  const colorRef = useRef(null)

  useEffect(() => {
    colorRef.current = color

    if (!initialRun.current) return

    initialRun.current = false
    const hsva = hslaToHsva(color)
    setPoint({ x: hsva.s, y: hsva.v })
  }, [color])

  useEffect(() => {
    if (!point) return

    onChange({
      ...hsvaToHsla({
        h: colorRef.current.hue,
        s: point.x,
        v: point.y,
        a: colorRef.current.alpha,
      }),
      hue: colorRef.current.hue,
      alpha: colorRef.current.alpha,
    })
  }, [point, onChange])

  const onChangeHue = useCallback((hue) => {
    onChange({ ...colorRef.current, hue })
  }, [onChange])

  const onChangeAlpha = useCallback((alpha) => {
    onChange({ ...colorRef.current, alpha })
  }, [onChange])

  return (
    <div className={classes.root}>
      <div style={{ height: 200 }}>
        <SinglePad
          value={point}
          onChange={setPoint}
          xRange={SATURATION_RANGE}
          yRange={VALUE_RANGE}
          padBackground={
            <Background
              hue={color.hue}
              alpha={color.alpha}
            />
          }
        />
      </div>
      <div style={{ height: 10 }} />
      <Slider
        label='hue'
        value={color.hue}
        onChange={onChangeHue}
        range={HUE_RANGE}
      />
      <div style={{ height: 10 }} />
      <Slider
        label='alpha'
        value={color.alpha}
        onChange={onChangeAlpha}
        range={ALPHA_RANGE}
        renderValue={(x) => x.toFixed(2)}
      />
    </div>
  )
}

export default ColorPicker
