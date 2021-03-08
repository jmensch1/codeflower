import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation, useRepo, useCamera, useModal } from 'store/selectors'
import { useDispatch } from 'react-redux'
import { checkerGradient } from 'services/utils/color'
import { getRepo } from 'store/actions/repo'
import { openModal } from 'store/actions/modals'
import Sidebar from './Sidebar'
import DragBar from './core/DragBar'
import Visualization from './Visualization'
import ControlBar from './ControlBar'
import Terminal from './Terminal'
import FileViewer from './modals/FileViewer'
import Modals from './modals'
import Aperture from './Aperture'
import Gallery from './modals/Gallery/Main'

const INITIAL_SIDEBAR_WIDTH = 350

const useStyles = makeStyles((theme) => ({
  '@global': {
    a: {
      textDecoration: 'underline',
      color: theme.palette.text.primary,
    },
  },
  app: {
    height: '100vh',
    display: 'flex',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: ({ dragging }) => (dragging ? 1 : -1),
      cursor: 'ew-resize',
    },
  },
  sidebar: {
    width: ({ sidebarWidth }) => sidebarWidth,
  },
  main: {
    position: 'relative',
    flex: 1,
    background: ({ transparent }) => transparent
      ? checkerGradient({ alpha: 0.04 })
      : 'none',
  },
  gallery: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    bottom: 0,
    zIndex: 2, // on top of terminal
    transition: 'all 0.5s ease-out',
    transform: ({ galleryIsOpen }) =>
      `translateX(${galleryIsOpen ? 0 : '100%'})`
  },
}))

function App() {
  const { isOpen: galleryIsOpen } = useModal('gallery')
  const { cameraOn, transparent } = useCamera()
  const [sidebarWidth, setSidebarWidth] = useState(INITIAL_SIDEBAR_WIDTH)
  const [dragging, setDragging] = useState(false)
  const classes = useStyles({ sidebarWidth, dragging, cameraOn, transparent, galleryIsOpen })
  const dispatch = useDispatch()
  const {
    query: { owner, name, branch },
  } = useLocation()
  const repo = useRepo()


  useEffect(() => {
    if (owner && name) dispatch(getRepo({ owner, name, branch }))
    else dispatch(openModal('search'))
  }, [dispatch, owner, name, branch])

  return (
    <>
      <div className={classes.app}>
        {repo && (
          <>
            <div className={classes.sidebar}>
              <Sidebar />
            </div>
            <DragBar
              onDragStart={() => setDragging(true)}
              onDrag={setSidebarWidth}
              onDragEnd={() => setDragging(false)}
            />
          </>
        )}
        <div className={classes.main}>
          <Visualization />
          {cameraOn && <Aperture />}
          <div style={{ visibility: cameraOn ? 'hidden' : 'visible' }}>
            <ControlBar />
            <Terminal />
            <FileViewer />
          </div>
          <div className={classes.gallery}>
            <Gallery />
          </div>
        </div>
      </div>
      <Modals />
    </>
  )
}

export default App
