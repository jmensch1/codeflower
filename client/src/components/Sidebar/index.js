import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRepo } from 'store/selectors'
import Header from './Header'
import Tabs from './Tabs'
import Languages from './Languages'
import Folders from './Folders'
import Authors from './Authors'
import Controls from './Controls'
import LanguageIcon from '@material-ui/icons/Language'
import FolderIcon from '@material-ui/icons/FolderOpen'
import PeopleIcon from '@material-ui/icons/People'
import TuneIcon from '@material-ui/icons/Tune'

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
]

/////////////////////// COMPONENT ////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRight: `1px ${theme.palette.divider} solid`,
  },
  header: {
    padding: '10px 10px 15px 10px',
  },
  content: {
    flex: 1,
    overflow: 'auto',
  },
}))

const Sidebar = () => {
  const classes = useStyles()
  const repo = useRepo()
  const [tab, setTab] = useState('folders')
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
