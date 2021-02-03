import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from './Tabs2'
import ForceControls from 'components/Visualization/ForceDirectedGraph/controls/ForceControls'
import StyleControls from 'components/Visualization/ForceDirectedGraph/controls/StyleControls'
import ThemeControls from 'components/ThemeControls'
import GradientPicker from 'components/core/GradientPicker'
import CoolSlider from 'components/core/CoolSlider'

//////////////////// TAB CONFIG ///////////////////

const MockGradientPicker = () => {
  const [color, setColor] = useState({
    hue: [50, 150],
    saturation: 100,
    lightness: 50,
    alpha: 1.0,
  })

  return (
    <div style={{ margin: 10 }}>
      <GradientPicker
        color={color}
        onChange={setColor}
      />
    </div>
  )
}

const MockSlider = () => {
  const [value, setValue] = useState(10)
  const [value2, setValue2] = useState(50)

  return (
    <div style={{
      margin: 10,
      padding: 10,
      border: '1px hsla(0,0%,100%,0.3) solid',
      borderRadius: 5
    }}>
      <CoolSlider
        height={20}
        value={value}
        onChange={setValue}
        range={[0, 100]}
      />
      <div style={{ height: 10 }} />
      <CoolSlider
        height={20}
        value={value2}
        onChange={setValue2}
        range={[0, 100]}
      />
    </div>
  )
}

const TABS = [
  {
    type: 'gradient',
    Component: () => (
      <>
        <MockGradientPicker />
        <MockSlider />
      </>
    ),
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
