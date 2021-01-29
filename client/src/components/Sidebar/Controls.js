import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from './Tabs2'
import ForceControls from 'components/Visualization/ForceDirectedGraph/ForceControls'
// import ColorControls from 'components/Visualization/ForceDirectedGraph/ColorControls'
import FileControls from 'components/Visualization/ForceDirectedGraph/FileControls'
// import FolderControls from 'components/Visualization/ForceDirectedGraph/FolderControls'
// import OtherControls from 'components/Visualization/ForceDirectedGraph/OtherControls'
import ThemeControls from 'components/ThemeControls'
import StyleControls from 'components/Visualization/ForceDirectedGraph/StyleControls'


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
  // {
  //   type: 'colors',
  //   Component: ColorControls,
  // },
  {
    type: 'files',
    Component: FileControls,
  },
  // {
  //   type: 'folders',
  //   Component: FolderControls,
  // },
  // {
  //   type: 'links',
  //   Component: () => <div>Links</div>,
  // },
  {
    type: 'other',
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
  const [tab, setTab] = useState('forces')
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
