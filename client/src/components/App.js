import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation, useRepo, useCamera } from 'store/selectors'
import { useDispatch } from 'react-redux'
import { getRepo } from 'store/actions/repo'
import { openModal } from 'store/actions/modals'
import Sidebar from './Sidebar'
import DragBar from './core/DragBar'
import Visualization from './Visualization'
import ControlBar from './ControlBar'
import Terminal from './Terminal'
import FileViewer from './modals/FileViewer'
import Modals from './modals'

const INITIAL_SIDEBAR_WIDTH = 350
// const GRADIENT_START_POSITION = '99.5'
// const GRADIENT_END_OPACITY = '0.5'

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
  },
  cameraIndicator: {
    border: `1px ${theme.palette.text.primary} dashed`,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    // backgroundImage: [
    //   `linear-gradient(
    //     to bottom,
    //       rgba(255,255,255, 0) ${GRADIENT_START_POSITION}%,
    //       rgba(255,255,255, ${GRADIENT_END_OPACITY}) 100%
    //   )`,
    //   `linear-gradient(
    //     to right,
    //       rgba(255,255,255, 0) ${GRADIENT_START_POSITION}%,
    //       rgba(255,255,255, ${GRADIENT_END_OPACITY}) 100%
    //   )`,
    //   `linear-gradient(
    //     to left,
    //       rgba(255,255,255, 0) ${GRADIENT_START_POSITION}%,
    //       rgba(255,255,255, ${GRADIENT_END_OPACITY}) 100%
    //   )`,
    //   `linear-gradient(
    //     to top,
    //       rgba(255,255,255, 0) ${GRADIENT_START_POSITION}%,
    //       rgba(255,255,255, ${GRADIENT_END_OPACITY}) 100%
    //   )`,
    // ].join(','),
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: ({ flashOn }) =>
        flashOn ? `hsla(0,0%,100%,0.5)` : `hsla(0,0%,100%,0)`,
      transition: 'background-color 0.1s ease-out',
    }
  },
}))

function App() {
  const { cameraOn, flashOn } = useCamera()
  const [sidebarWidth, setSidebarWidth] = useState(INITIAL_SIDEBAR_WIDTH)
  const [dragging, setDragging] = useState(false)
  const classes = useStyles({ sidebarWidth, dragging, cameraOn, flashOn })
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
          {cameraOn && <div className={classes.cameraIndicator} />}
          <div style={{ visibility: cameraOn ? 'hidden' : 'visible' }}>
            <ControlBar />
            <Terminal />
            <FileViewer />
          </div>
        </div>
      </div>
      <Modals />
    </>
  )
}

export default App
