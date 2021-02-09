import React, { useMemo } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useMainTheme } from 'store/selectors'
import { updateMainTheme } from 'store/actions/settings'
import Slider from 'components/core/Slider'
import {
  getPathsWithDefault,
  createUpdaters,
  getLightness,
  getAlpha,
  colorString,
  toFixed0,
  toFixed2,
} from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: '1em',
    },
  },
}))

function getColorFromLightness(lightness) {
  return colorString({
    hue: 0,
    saturation: 0,
    lightness,
    alpha: 1,
  })
}

function getColorFromAlpha(alpha) {
  return colorString({
    hue: 0,
    saturation: 0,
    lightness: 100,
    alpha,
  })
}

const PATHS = [
  'palette.background.default',
  'palette.background.paper',
  'palette.divider',
  'typography.fontSize',
]

const RANGES = {
  'palette.background.default': [0, 100, 1],
  'palette.background.paper': [0, 100, 1],
  'palette.divider': [0, 1, 0.01],
  'typography.fontSize': [8, 20, 1],
}

const ThemeControls = () => {
  const classes = useStyles()
  const mainTheme = useMainTheme()
  const theme = useTheme()
  const dispatch = useDispatch()

  const values = useMemo(() => {
    return getPathsWithDefault(mainTheme, PATHS, theme)
  }, [mainTheme, theme])

  const updaters = useMemo(() => {
    return createUpdaters(PATHS, updateMainTheme, dispatch)
  }, [dispatch])

  return (
    <div className={classes.root}>
      <Slider
        label="main background"
        range={RANGES['palette.background.default']}
        value={getLightness(values['palette.background.default'])}
        onChange={(value) => {
          updaters['palette.background.default'](getColorFromLightness(value))
        }}
        renderValue={toFixed0}
      />
      <Slider
        label="secondary background"
        range={RANGES['palette.background.paper']}
        value={getLightness(values['palette.background.paper'])}
        onChange={(value) => {
          updaters['palette.background.paper'](getColorFromLightness(value))
        }}
        renderValue={toFixed0}
      />
      <Slider
        label="divider opacity"
        range={RANGES['palette.divider']}
        value={getAlpha(values['palette.divider'])}
        onChange={(value) => {
          updaters['palette.divider'](getColorFromAlpha(value))
        }}
        renderValue={toFixed2}
      />
      <Slider
        label="font size"
        range={RANGES['typography.fontSize']}
        value={values['typography.fontSize']}
        onChange={updaters['typography.fontSize']}
      />
    </div>
  )
}

export default ThemeControls
