import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useMainTheme } from 'store/selectors'
import { updateMainTheme } from 'store/actions/settings'
import Slider from 'components/core/Slider'
import LightnessSlider from 'components/core/LightnessSlider'
import { getPaths, createUpdaters } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginBottom: '1em',
    },
  },
}))

const PATHS = [
  'fontSize',
  'sidebarBackgroundColor',
]

const RANGES = {
  'fontSize': [8, 20, 1],
}

const ThemeControls = () => {
  const classes = useStyles()
  const mainTheme = useMainTheme()
  const dispatch = useDispatch()

  const values = useMemo(() => {
    return getPaths(mainTheme, PATHS)
  }, [mainTheme])

  const updaters = useMemo(() => {
    return createUpdaters(PATHS, updateMainTheme, dispatch)
  }, [dispatch])

  return (
    <div className={classes.root}>
      <LightnessSlider
        label="sidebar lightness"
        color={values['sidebarBackgroundColor']}
        onChange={updaters['sidebarBackgroundColor']}
      />
      <Slider
        label="font size"
        range={RANGES['fontSize']}
        value={values['fontSize']}
        onChange={updaters['fontSize']}
      />
    </div>
  )
}

export default ThemeControls
