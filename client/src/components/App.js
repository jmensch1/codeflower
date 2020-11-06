import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRepo } from 'store/repo'
import { setFolderPath } from 'store/folders'
import { useRepo, useFolders } from 'store/selectors'
import Visualization from './Visualization'
import Languages from './Languages'
import ThemeSelect from './ThemeSelect'
import FolderSelect from './FolderSelect'
import FileViewer from './FileViewer'

function App() {
  const dispatch = useDispatch()
  const repo = useRepo()
  const folders = useFolders()

  useEffect(() => {
    dispatch(getRepo())
  }, [dispatch])

  useEffect(() => {
    if (repo && !folders.selectedFolder)
      dispatch(setFolderPath(folders.folderPaths[0].pathName))
  }, [repo, folders, dispatch])

  return (
    <>
      <Languages />
      <ThemeSelect />
      <FolderSelect />
      <FileViewer />
      <Visualization />
    </>
  );
}

export default App
