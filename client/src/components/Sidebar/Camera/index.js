import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { updateCamera, resetCamera } from 'store/actions/camera'
import { useCamera } from 'store/selectors'
import Checkbox from 'components/core/Checkbox'
import SubTabs from '../core/SubTabs'
import Publish from './Publish'
import Download from './Download'
import { gallery } from 'constants.js'

const TABS = [
  {
    type: 'publish',
    Component: Publish,
  },
  {
    type: 'download',
    Component: Download,
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  tabs: {
    padding: '10px 10px 0 10px',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    overscrollBehavior: 'contain',
    padding: 20,
  },
  apertureToggle: {
    padding: '1em',
    borderTop: `1px ${theme.palette.divider} solid`,
  },
}))

const Camera = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [tab, setTab] = useState('publish')
  const { Component } = TABS.find((t) => t.type === tab)
  const { showAperture } = useCamera()

  useEffect(() => {
    dispatch(updateCamera({ cameraOn: true }))
    return () => dispatch(resetCamera())
  }, [dispatch])

  useEffect(() => {
    const aspectRatio =
      tab === 'publish' ? gallery.THUMB_WIDTH / gallery.THUMB_HEIGHT : null
    dispatch(updateCamera({ aspectRatio }))
  }, [tab, dispatch])

  const toggleAperture = useCallback(() => {
    dispatch(updateCamera({ showAperture: !showAperture }))
  }, [dispatch, showAperture])

  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <SubTabs tabs={TABS} activeTab={tab} onChange={setTab} />
      </div>
      <div className={classes.content}>
        <Component />
      </div>
      <div className={classes.apertureToggle}>
        <Checkbox
          checked={showAperture}
          onChange={toggleAperture}
          label="show aperture"
        />
      </div>
    </div>
  )
}

export default Camera
