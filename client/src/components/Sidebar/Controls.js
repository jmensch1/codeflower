import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from './Tabs2'
import ForceControls from 'components/Visualization/ForceDirectedGraph/ForceControls'
import StyleControls from 'components/Visualization/ForceDirectedGraph/StyleControls'
import ThemeControls from 'components/ThemeControls'

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
    type: 'theme',
    Component: ThemeControls,
  },
  // {
  //   type: 'other',
  //   Component: () => <div>Other</div>,
  // },
  // {
  //   type: 'files',
  //   Component: () => <div>Files</div>,
  // },
  // {
  //   type: 'folders',
  //   Component: () => <div>Folders</div>,
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
  header: {
    padding: '10px 10px 15px 10px',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    paddingTop: 10,
  },
}))

const Controls = () => {
  const classes = useStyles()
  const [tab, setTab] = useState('forces')
  const { Component } = TABS.find((t) => t.type === tab)

  return (
    <div className={classes.root}>
      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />
      <div className={classes.content}>
        <Component />
      </div>
    </div>
  )
}

export default Controls
