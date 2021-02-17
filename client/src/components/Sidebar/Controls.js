import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SubTabs from './SubTabs'
import ForceControls from 'components/Visualization/ForceDirectedGraph/controls/ForceControls'
import StyleControls from 'components/Visualization/ForceDirectedGraph/controls/StyleControls'
import PositionControls from 'components/Visualization/ForceDirectedGraph/controls/PositionControls'
// import ThemeControls from 'components/theme/ThemeControls'

//////////////////// TAB CONFIG ///////////////////

const TABS = [
  {
    type: 'forces',
    Component: ForceControls,
  },
  {
    type: 'styles',
    Component: StyleControls,
  },
  {
    type: 'position',
    Component: PositionControls,
  },
  // {
  //   type: 'other',
  //   Component: ThemeControls,
  // },
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
    padding: '10px 10px 0 10px',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: 20,
  },
}))

const Controls = () => {
  const classes = useStyles()
  const [tab, setTab] = useState('forces')
  const { Component } = TABS.find((t) => t.type === tab)

  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <SubTabs tabs={TABS} activeTab={tab} onChange={setTab} />
      </div>
      <div className={classes.content}>
        <Component />
      </div>
    </div>
  )
}

export default Controls
