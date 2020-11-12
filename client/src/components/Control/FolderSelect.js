import React from 'react'
import { useDispatch } from 'react-redux'
import { useFolders } from 'store/selectors'
import { setFolderPath } from 'store/folders'
import Select from './Select'

const FolderSelect = () => {
  const folders = useFolders()
  const dispatch = useDispatch()

  if (!folders) return null

  return (
    <Select
      value={folders.selectedFolder}
      onChange={e => dispatch(setFolderPath(e.target.value))}
      options={folders.folderPaths.map(({ pathName }) => pathName )}
      helperText='select folder to render'
    />
  )
}

export default FolderSelect
