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

const useGlobalStyles = makeStyles((theme) => ({
  '@global': {
    a: {
      textDecoration: 'underline',
      color: theme.palette.text.primary,
    },
  },
}))

function App() {
  useGlobalStyles()
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
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
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
