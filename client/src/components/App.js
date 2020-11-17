import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRepo } from 'store/repo'
import { queryParams } from 'services/utils'
import Visualization from './Visualization'
import Languages from './Languages'
import FileViewer from './FileViewer'
import Terminal from './Terminal'
import ControlBar from './ControlBar'
import MaxNodes from './modals/MaxNodes'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const { owner, name, branch } = queryParams()
    dispatch(getRepo({ owner, name, branch }))
  }, [dispatch])

  return (
    <>
      <Languages />
      <ControlBar />
      <FileViewer />
      <Terminal />
      <Visualization />
      <MaxNodes />
    </>
  );
}

export default App
