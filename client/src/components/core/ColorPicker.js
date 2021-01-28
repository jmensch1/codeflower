import React, { useState } from 'react'
import { SmartSlider } from './Slider'
import { makeStyles } from '@material-ui/core/styles'
import { getPath, colorString, hueGradient } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: '0.875em',
  },
  swatch: {
    width: 40,
    height: 20,
    cursor: 'pointer',
    borderRadius: 5,
  },
  sliders: {
    marginTop: 10,
  },
}))

const ColorPicker = ({ label, obj, path, onChange }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles({
    color: colorString(getPath(obj, path))
  })

  const color = getPath(obj, path)

  const swatchStyle = (() => {
    if (color.hue instanceof Array) {
      return {
        background: hueGradient({
          hueMin: color.hue[0],
          hueMax: color.hue[1],
          saturation: color.saturation,
          lightness: color.lightness,
          alpha: color.alpha,
        }),
        borderWidth: 0,
      }
    } else {
      return (
        { backgroundColor: colorString(color) }
      )
    }
  })()

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <label className={classes.label}>{ label }</label>
        <div
          onClick={() => setOpen(!open)}
          className={classes.swatch}
          style={swatchStyle}
        />
      </div>
      {open && (
        <div className={classes.sliders}>
        <SmartSlider
          // label='hue'
          range={[0, 360, 1]}
          obj={obj}
          path={`${path}.hue`}
          onChange={onChange}
          gradient='hue'
        />
        <SmartSlider
          // label='saturation'
          range={[0, 100, 1]}
          obj={obj}
          path={`${path}.saturation`}
          onChange={onChange}
        />
        <SmartSlider
          // label='lightness'
          range={[0, 100, 1]}
          obj={obj}
          path={`${path}.lightness`}
          onChange={onChange}
          gradient='lightness'
        />
        <SmartSlider
          // label='opacity'
          range={[0, 1, 0.01]}
          obj={obj}
          path={`${path}.alpha`}
          onChange={onChange}
          gradient='opacity'
        />
        </div>
      )}
    </div>
  )
}

export default ColorPicker
