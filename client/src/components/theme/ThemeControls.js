import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useBaseTheme } from 'store/selectors'
import { updateBaseTheme } from 'store/actions/settings'
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

const PATHS = ['fontSize', 'sidebarBackgroundColor']

const RANGES = {
  fontSize: [8, 20, 1],
}

const ThemeControls = () => {
  const classes = useStyles()
  const baseTheme = useBaseTheme()
  const dispatch = useDispatch()

  const values = useMemo(() => {
    return getPaths(baseTheme, PATHS)
  }, [baseTheme])

  const updaters = useMemo(() => {
    return createUpdaters(PATHS, updateBaseTheme, dispatch)
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
