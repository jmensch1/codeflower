import React, { useEffect } from 'react'
import { useLocation } from 'store/selectors'
import { useDispatch } from 'react-redux'
import { getRepo } from 'store/actions/repo'
import { openModal } from 'store/actions/modals'
import Visualization from './Visualization'
// import RepoInfo from './RepoInfo'
import Terminal from './Terminal'
import ControlBar from './ControlBar'
// import Sidebar from './Sidebar'
import Modals from './modals'
import Aside from './Aside'

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
      <div style={{ display: 'flex', height: '100vh', }}>
        <Aside />
        <div style={{ position: 'relative', flex: 1 }}>
          {/*<RepoInfo />*/}
          <ControlBar />
          <Terminal />
          <Visualization />
        </div>
      </div>
      <Modals />
    </>
  )
}

export default App
