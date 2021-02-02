import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from './Tabs2'
import ForceControls from 'components/Visualization/ForceDirectedGraph/controls/ForceControls'
import StyleControls from 'components/Visualization/ForceDirectedGraph/controls/StyleControls'
import ThemeControls from 'components/ThemeControls'
import GradientPicker from 'components/core/GradientPicker'

//////////////////// TAB CONFIG ///////////////////

const MockGradientPicker = () => {
  const [color, setColor] = useState({
    hue: [50, 150],
    saturation: 100,
    lightness: 50,
    alpha: 1.0,
  })

  return (
    <GradientPicker
      color={color}
      onChange={setColor}
    />
  )
}

const TABS = [
  {
    type: 'gradient',
    Component: MockGradientPicker,
  },
  {
    type: 'forces',
    Component: ForceControls,
  },
  {
    type: 'styles',
    Component: StyleControls,
  },
  {
    type: 'other',
    Component: ThemeControls,
  },
]

/////////////////////// COMPONENT ////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  tabs: {
    padding: '0 10px',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: 10,
  },
}))

const Controls = () => {
  const classes = useStyles()
  const [tab, setTab] = useState('gradient')
  const { Component } = TABS.find((t) => t.type === tab)

  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />
      </div>
      <div className={classes.content}>
        <Component />
      </div>
    </div>
  )
}

export default Controls
