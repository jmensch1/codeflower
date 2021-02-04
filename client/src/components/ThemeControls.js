import React, { useCallback } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { SmartSlider } from 'components/core/Slider'
import tinycolor from 'tinycolor2'
import { useMainTheme } from 'store/selectors'
import { setMainTheme } from 'store/actions/settings'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: '1em',
    },
  },
}))

function getLightnessFromColor(color) {
  return Math.round(100 * tinycolor(color).toHsl().l)
}

function getColorFromLightness(lightness) {
  return `hsl(0, 0%, ${lightness}%)`
}

function getAlphaFromColor(color) {
  return tinycolor(color).getAlpha()
}

function getColorFromAlpha(alpha) {
  return `rgba(255, 255, 255, ${alpha})`
}

const ThemeControls = () => {
  const classes = useStyles()
  const mainTheme = useMainTheme()
  const theme = useTheme()
  const dispatch = useDispatch()

  const onChange = useCallback(
    (mainTheme) => {
      dispatch(setMainTheme(mainTheme))
    },
    [dispatch]
  )

  return (
    <div className={classes.root}>
      <SmartSlider
        label="main background"
        range={[0, 100, 1]}
        transform={{
          in: getLightnessFromColor,
          out: getColorFromLightness,
        }}
        obj={mainTheme}
        defaultObj={theme}
        path="palette.background.default"
        onChange={onChange}
        alwaysOpen
      />
      <SmartSlider
        label="secondary background"
        range={[0, 100, 1]}
        transform={{
          in: getLightnessFromColor,
          out: getColorFromLightness,
        }}
        obj={mainTheme}
        defaultObj={theme}
        path="palette.background.paper"
        onChange={onChange}
        alwaysOpen
      />
      <SmartSlider
        label="divider opacity"
        range={[0, 1, 0.01]}
        transform={{
          in: getAlphaFromColor,
          out: getColorFromAlpha,
        }}
        obj={mainTheme}
        defaultObj={theme}
        path="palette.divider"
        onChange={onChange}
        alwaysOpen
      />
      <SmartSlider
        label="font size"
        range={[8, 20, 1]}
        obj={mainTheme}
        defaultObj={theme}
        path="typography.fontSize"
        onChange={onChange}
        alwaysOpen
      />
    </div>
  )
}

export default ThemeControls
