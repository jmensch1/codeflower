import React, { useState } from 'react'
import { SmartSlider } from './Slider'
import { makeStyles } from '@material-ui/core/styles'
import { getPath, colorString } from 'services/utils'

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
    display: 'inline-block',
    width: 40,
    height: 20,
    backgroundColor: ({ color }) => color,
    cursor: 'pointer',
    borderRadius: 5,
    border: `1px ${theme.palette.divider} solid`,
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

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <label className={classes.label}>{ label }</label>
        <div onClick={() => setOpen(!open)}>
          <span className={classes.swatch} />
        </div>
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
