import React, { useEffect } from 'react'
import { useLocation } from 'store/selectors'
import { useDispatch } from 'react-redux'
import { getRepo } from 'store/repo'
import { openModal } from 'store/modals'
import Visualization from './Visualization'
import Languages from './Languages'
import FileViewer from './FileViewer'
import Terminal from './Terminal'
import ControlBar from './ControlBar'
import Modals from './modals'

function App() {
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
      <Languages />
      <ControlBar />
      <FileViewer />
      <Terminal />
      <Visualization />
      <Modals />
    </>
  )
}

export default App
