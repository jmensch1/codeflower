import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation } from 'store/selectors'
import { useDispatch } from 'react-redux'
import { getRepo } from 'store/actions/repo'
import { openModal } from 'store/actions/modals'
import Sidebar from './Sidebar'
import DragBar from './DragBar'
import Visualization from './Visualization'
import ControlBar from './ControlBar'
import Terminal from './Terminal'
import FileViewer from './modals/FileViewer'
import Modals from './modals'

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
  },
}))

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(INITIAL_SIDEBAR_WIDTH)
  const [dragging, setDragging] = useState(false)
  const classes = useStyles({ sidebarWidth, dragging })
  const dispatch = useDispatch()
  const {
    query: { owner, name, branch },
  } = useLocation()

  useEffect(() => {
    if (owner && name) dispatch(getRepo({ owner, name, branch }))
    else dispatch(openModal('search'))
  }, [dispatch, owner, name, branch])

  return (
    <>
      <div className={classes.app}>
        <div className={classes.sidebar}>
          <Sidebar />
        </div>
        <DragBar
          onDragStart={() => setDragging(true)}
          onDrag={setSidebarWidth}
          onDragEnd={() => setDragging(false)}
        />
        <div className={classes.main}>
          <Visualization />
          <ControlBar />
          <Terminal />
          <FileViewer />
        </div>
      </div>
      <Modals />
    </>
  )
}

export default App
