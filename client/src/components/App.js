import React, { useEffect, useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { useLocation, useRepo } from 'store/selectors'
import { useDispatch } from 'react-redux'
import { getRepo } from 'store/actions/repo'
import { openModal } from 'store/actions/modals'
import Sidebar from './Sidebar'
import DragHandle from './core/DragHandle'
import Main from './Main'
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
  },
  sidebar: {
    width: ({ sidebarWidth }) => sidebarWidth,
  },
  main: {
    flex: 1,
    height: '100%',
  },
  dragMask: {
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      cursor: 'ew-resize',
    },
  }
}))

const App = () => {
  const [sidebarWidth, setSidebarWidth] = useState(INITIAL_SIDEBAR_WIDTH)
  const [dragging, setDragging] = useState(false)
  const classes = useStyles({ sidebarWidth, dragging })
  const dispatch = useDispatch()
  const repo = useRepo()
  const { query: { owner, name, branch } } = useLocation()

  useEffect(() => {
    if (owner && name) dispatch(getRepo({ owner, name, branch }))
    else dispatch(openModal('search'))
  }, [dispatch, owner, name, branch])

  const onDragStart = useCallback(() => setDragging(true), [])
  const onDragEnd = useCallback(() => setDragging(false), [])

  return (
    <>
      <div className={clsx(classes.app, {[classes.dragMask]: dragging})}>
        {repo && (
          <>
            <div className={classes.sidebar}>
              <Sidebar />
            </div>
            <DragHandle
              onDragStart={onDragStart}
              onDrag={setSidebarWidth}
              onDragEnd={onDragEnd}
            />
          </>
        )}
        <div className={classes.main}>
          <Main />
        </div>
      </div>
      <Modals />
    </>
  )
}

export default App
