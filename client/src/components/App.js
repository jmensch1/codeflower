import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation } from 'store/selectors'
import { useDispatch } from 'react-redux'
import { getRepo } from 'store/actions/repo'
import { openModal } from 'store/actions/modals'
import Sidebar from './Sidebar'
import Visualization from './Visualization'
import ControlBar from './ControlBar'
import Terminal from './Terminal'
import Modals from './modals'
import DragBar from './DragBar'

const useStyles = makeStyles((theme) => ({
  '@global': {
    a: {
      textDecoration: 'underline',
      color: theme.palette.text.primary,
    },
  },
  app: {
    display: 'flex',
    height: '100vh',
    ...theme.app,
  }
}))

function App() {
  const classes = useStyles()
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
        <Sidebar />
        <DragBar />
        <div style={{ position: 'relative', flex: 1 }}>
          <Visualization />
          <ControlBar />
          <Terminal />
        </div>
      </div>
      <Modals />
    </>
  )
}

export default App
