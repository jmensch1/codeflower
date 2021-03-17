import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRepo, useModal } from 'store/selectors'
import Header from './core/Header'
import Tabs from './core/Tabs'
import Languages from './Languages'
import Folders from './Folders'
// import Authors from './Authors'
import Controls from './Controls'
import Camera from './Camera'
import Gallery from './Gallery'
import LanguageIcon from '@material-ui/icons/Language'
import FolderIcon from '@material-ui/icons/FolderOpen'
// import PeopleIcon from '@material-ui/icons/People'
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
  // {
  //   type: 'authors',
  //   Icon: PeopleIcon,
  //   Component: Authors,
  // },
  {
    type: 'controls',
    Icon: TuneIcon,
    Component: Controls,
  },
  {
    type: 'camera',
    Icon: CameraIcon,
    Component: Camera,
  },
]

/////////////////////// COMPONENT ////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
  header: {
    padding: '10px 10px 15px 10px',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    overscrollBehavior: 'contain',
  },
  gallery: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    bottom: 0,
    zIndex: 2,
    transition: 'all 0.5s ease-out',
    transform: ({ galleryIsOpen }) =>
      `translateX(${galleryIsOpen ? 0 : '-100%'})`,
  },
}))

const SidebarContent = () => {
  const { isOpen: galleryIsOpen } = useModal('gallery')
  const classes = useStyles({ galleryIsOpen })
  const repo = useRepo()
  const [tab, setTab] = useState('languages')

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
      <div className={classes.gallery}>
        <Gallery />
      </div>
    </div>
  )
}

export default SidebarContent
