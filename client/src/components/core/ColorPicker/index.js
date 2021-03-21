import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Pad from './Pad'
import Slider from 'components/core/Slider'
import saturationLightness from './saturationLightness'
import { hueGradient, alphaGradient, hslToHsv, hsvToHsl } from 'services/utils'

//// CONSTANTS ////

const HUE_RANGE = [0, 360]
const SATURATION_RANGE = [0, 100]
const VALUE_RANGE = [0, 100]
const ALPHA_RANGE = [0, 1]

//// COMPONENT ////

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.7em',
    fontStyle: 'italic',
    opacity: 0.8,
    marginBottom: 3,
  },
  pad: {
    height: 200,
  },
  slider: {
    marginTop: 10,
  },
}))

const ColorPicker = ({
  color,
  onChange,
  showLabels = true,
  showAlpha = true,
}) => {
  const classes = useStyles()
  const colorRef = useRef(null)

  useEffect(() => {
    colorRef.current = color
  }, [color])

  const onChangePad = useCallback(
    ({ x, y }) => {
      const { hue, alpha } = colorRef.current
      const [, saturation, lightness] = hsvToHsl([hue, x, y])
      onChange({ hue, saturation, lightness, alpha })
    },
    [onChange]
  )

  const onChangeHue = useCallback(
    (hue) => {
      onChange({ ...colorRef.current, hue })
    },
    [onChange]
  )

  const onChangeAlpha = useCallback(
    (alpha) => {
      onChange({ ...colorRef.current, alpha })
    },
    [onChange]
  )

  const [, saturation, value] = useMemo(() => {
    const { hue: h, saturation: s, lightness: l } = color
    return hslToHsv([h, s, l])
  }, [color])

  return (
    <div className={classes.root}>
      {showLabels && (
        <div className={classes.label}>
          <span>saturation / lightness</span>
          <span>
            {color.saturation.toFixed(0)} / {color.lightness.toFixed(0)}
          </span>
        </div>
      )}
      <div className={classes.pad}>
        <Pad
          value={{
            x: saturation,
            y: value,
          }}
          onChange={onChangePad}
          xRange={SATURATION_RANGE}
          yRange={VALUE_RANGE}
          background={saturationLightness({ hue: color.hue })}
        />
      </div>

      <div className={classes.slider}>
        {showLabels && (
          <div className={classes.label}>
            <span>hue</span>
            <span>{color.hue.toFixed(0)}</span>
          </div>
        )}
        <Slider
          value={color.hue}
          onChange={onChangeHue}
          range={HUE_RANGE}
          background={hueGradient()}
        />
      </div>

      {showAlpha && (
        <div className={classes.slider}>
          {showLabels && (
            <div className={classes.label}>
              <span>alpha</span>
              <span>{color.alpha.toFixed(2)}</span>
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
      )}
    </div>
  )
}

export default ColorPicker
