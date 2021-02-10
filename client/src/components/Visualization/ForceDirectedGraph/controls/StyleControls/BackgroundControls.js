import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useVisStyles } from 'store/selectors'
import { updateVisStyles } from 'store/actions/settings'
import LightnessSlider from 'components/core/LightnessSlider'
import Collapse from 'components/core/Collapse'
import { getPaths, createUpdaters } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const PATHS = ['background.fill']

const BackgroundControls = () => {
  const classes = useStyles()
  const visStyles = useVisStyles()
  const dispatch = useDispatch()

  const values = useMemo(() => {
    return getPaths(visStyles, PATHS)
  }, [visStyles])

  const updaters = useMemo(() => {
    return createUpdaters(PATHS, updateVisStyles, dispatch)
  }, [dispatch])

  if (!visStyles) return null
  return (
    <div className={classes.root}>
      <Collapse
        label="lightness"
        level={1}
        headerRight={values['background.fill'].lightness.toFixed(0)}
      >
        <LightnessSlider
          color={values['background.fill']}
          onChange={updaters['background.fill']}
        />
      </Collapse>
    </div>
  )
}

export default BackgroundControls
