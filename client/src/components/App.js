import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRepo } from 'store/repo'
import { selectFolder } from 'store/folders'
import { useRepo, useFolders } from 'store/selectors'
import Visualization from './Visualization'
import Languages from './Languages'
import FileViewer from './FileViewer'
import Terminal from './Terminal'
// import Control from './Control'
import ControlBar from './ControlBar'
import { queryParams } from 'services/utils'

function App() {
  const dispatch = useDispatch()
  const repo = useRepo()
  const folders = useFolders()

  useEffect(() => {
    const { owner, name, branch } = queryParams()
    dispatch(getRepo({ owner, name, branch }))
  }, [dispatch])

  useEffect(() => {
    if (repo && !folders.selectedFolder)
      dispatch(selectFolder(folders.folderPaths[0].pathName))
  }, [repo, folders, dispatch])

  return (
    <>
      <Languages />
      <ControlBar />
      {/*<Control />*/}
      <FileViewer />
      <Terminal />
      <Visualization />
    </>
  );
}

export default App
