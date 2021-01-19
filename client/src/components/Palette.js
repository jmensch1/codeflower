import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from 'components/core/Slider'
import tinycolor from 'tinycolor2'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
}))

function getLightness(color) {
  return 100 * tinycolor(color).toHsl().l
}

const Palette = ({ palette, onChange }) => {
  const classes = useStyles()

  const defaultLightness = getLightness(palette.background.default)
  const paperLightness = getLightness(palette.background.paper)
  const dividerOpacity = tinycolor(palette.divider).getAlpha()

  return (
    <div className={classes.root}>
      <label>main background ({defaultLightness.toFixed(0)})</label>
      <Slider
        min={0}
        max={100}
        value={defaultLightness}
        onChange={(e, newVal) => {
          onChange({
            ...palette,
            background: {
              ...palette.background,
              default: `hsl(0,0%,${newVal}%)`,
            },
          })
        }}
      />
      <label>secondary background ({paperLightness.toFixed(0)})</label>
      <Slider
        min={0}
        max={100}
        value={paperLightness}
        onChange={(e, newVal) => {
          onChange({
            ...palette,
            background: {
              ...palette.background,
              paper: `hsl(0,0%,${newVal}%)`,
            },
          })
        }}
      />
      <label>divider opacity ({dividerOpacity.toFixed(2)})</label>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={dividerOpacity}
        onChange={(e, newVal) => {
          onChange({
            ...palette,
            divider: `rgba(255,255,255,${newVal})`,
          })
        }}
      />
    </div>
  )
}

export default Palette
