import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRepo } from 'store/selectors'
import Header from './Header'
import Tabs from './Tabs'
import Languages from './Languages'
import Folders from './Folders'
import Authors from './Authors'
import Controls from './Controls'
import Camera from './Camera'
import LanguageIcon from '@material-ui/icons/Language'
import FolderIcon from '@material-ui/icons/FolderOpen'
import PeopleIcon from '@material-ui/icons/People'
import TuneIcon from '@material-ui/icons/Tune'
import CameraIcon from '@material-ui/icons/CameraAlt'

//////////////////// TAB CONFIG ///////////////////

const TABS = [
  {
    type: 'languages',
    Icon: LanguageIcon,
    Component: Languages,
  },
  {
    type: 'folders',
    Icon: FolderIcon,
    Component: Folders,
  },
  {
    type: 'authors',
    Icon: PeopleIcon,
    Component: Authors,
  },
  {
    type: 'controls',
    Icon: TuneIcon,
    Component: Controls,
  },
  {
    type: 'camera',
    Icon: CameraIcon,
    Component: Camera,
  }
]

/////////////////////// COMPONENT ////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
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
    overscrollBehavior: 'contain',
  },
}))

const Sidebar = () => {
  const classes = useStyles()
  const repo = useRepo()
  const [tab, setTab] = useState('camera')
  const { Component } = TABS.find((t) => t.type === tab)

  if (!repo) return null
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header />
      </div>
      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />
      <div className={classes.content}>
        <Component />
      </div>
    </div>
  )
}

export default Sidebar
