import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pad from './Pad'
import Slider from 'components/core/Slider'
import saturationLightness from './saturationLightness'
import { hueGradient, alphaGradient } from 'services/utils'

//// CONSTANTS ////

const HUE_RANGE = [0, 360, 1]
const SATURATION_RANGE = [0, 100]
const VALUE_RANGE = [0, 100]
const ALPHA_RANGE = [0, 1, 0.01]

//// COLOR CONVERSION ////
// functions from npm color-convert

function hslToHsv(hsl) {
  const h = hsl[0]
  let s = hsl[1] / 100
  let l = hsl[2] / 100
  let smin = s
  const lmin = Math.max(l, 0.01)

  l *= 2
  s *= (l <= 1) ? l : 2 - l
  smin *= lmin <= 1 ? lmin : 2 - lmin
  const v = (l + s) / 2
  const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s)

  return [h, sv * 100, v * 100]
}

function hsvToHsl(hsv) {
  const h = hsv[0]
  const s = hsv[1] / 100
  const v = hsv[2] / 100
  const vmin = Math.max(v, 0.01)
  let sl
  let l

  l = (2 - s) * v
  const lmin = (2 - s) * vmin
  sl = s * vmin
  sl /= (lmin <= 1) ? lmin : 2 - lmin
  sl = sl || 0
  l /= 2

  return [h, sl * 100, l * 100]
}

//// COMPONENT ////

const useStyles = makeStyles(theme => ({
  root: {},
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.7em',
    fontStyle: 'italic',
    opacity: 0.8,
    marginBottom: 3,
    '&:not(:first-of-type)': {
      marginTop: 10,
    },
  },
  pad: {
    height: 200,
  },
  slider: {
    marginTop: 10,
  },
}))

const ColorPicker = ({ color, onChange, showLabels = true }) => {
  const classes = useStyles()
  const colorRef = useRef(null)

  useEffect(() => {
    colorRef.current = color
  }, [color])

  const onChangePad = useCallback(({ x, y }) => {
    const { hue, alpha } = colorRef.current
    const [, saturation, lightness] = hsvToHsl([hue, x, y])
    onChange({ hue, saturation, lightness, alpha })
  }, [onChange])

  const onChangeHue = useCallback((hue) => {
    onChange({ ...colorRef.current, hue })
  }, [onChange])

  const onChangeAlpha = useCallback((alpha) => {
    onChange({ ...colorRef.current, alpha })
  }, [onChange])

  const [, saturation, lightness] = useMemo(() => {
    const { hue: h, saturation: s, lightness: l } = color
    return hslToHsv([h, s, l])
  }, [color])

  return (
    <div className={classes.root}>
      {showLabels && (
        <div className={classes.label}>
          <span>saturation / lightness</span>
          <span>{ saturation.toFixed(0) } / { lightness.toFixed(0) }</span>
        </div>
      )}
      <div className={classes.pad}>
        <Pad
          value={{
            x: saturation,
            y: lightness,
          }}
          onChange={onChangePad}
          xRange={SATURATION_RANGE}
          yRange={VALUE_RANGE}
          background={saturationLightness({
            hue: color.hue,
            alpha: color.alpha,
          })}
        />
      </div>

      <div className={classes.slider}>
        {showLabels && (
          <div className={classes.label}>
            <span>hue</span>
            <span>{ color.hue.toFixed(0) }</span>
          </div>
        )}
        <Slider
          value={color.hue}
          onChange={onChangeHue}
          range={HUE_RANGE}
          background={hueGradient()}
        />
      </div>

      <div className={classes.slider}>
        {showLabels && (
          <div className={classes.label}>
            <span>alpha</span>
            <span>{ color.alpha.toFixed(2) }</span>
          </div>
        )}
        <Slider
          value={color.alpha}
          onChange={onChangeAlpha}
          range={ALPHA_RANGE}
          renderValue={(x) => x.toFixed(2)}
          background={alphaGradient({ hue: color.hue })}
        />
      </div>
    </div>
  )
}

export default ColorPicker
