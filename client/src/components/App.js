import React, { useEffect } from 'react'
import { useLocation } from 'store/selectors'
import { useDispatch } from 'react-redux'
import { getRepo } from 'store/actions/repo'
import { openModal } from 'store/actions/modals'
import Visualization from './Visualization'
import RepoInfo from './RepoInfo'
import FileViewer from './FileViewer'
import Terminal from './Terminal'
import ControlBar from './ControlBar'
import Tree from './Tree'
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
      <div style={{ display: 'flex' }}>
        <Tree />
        <div style={{ position: 'relative', flex: 1 }}>
          <RepoInfo />
          <ControlBar />
          <FileViewer />
          <Terminal />
          <Visualization />
        </div>
      </div>
      <Modals />
    </>
  )
}

export default App
