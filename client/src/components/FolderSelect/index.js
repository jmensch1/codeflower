import React from 'react'
import { useDispatch } from 'react-redux'
import { useFolders } from 'store/selectors'
import { setFolderPath } from 'store/folders'

const FolderSelect = () => {
  const folders = useFolders()
  const dispatch = useDispatch()

  if (!folders) return null
  return (
    <div
      style={{
        position: 'absolute',
        top: 30,
        right: 10,
        zIndex: 1,
      }}
    >
      <select
        value={folders.selectedFolder}
        onChange={e => dispatch(setFolderPath(e.target.value))}
      >
        {folders.folderPaths.map(({ pathName }) => (
          <option
            key={pathName}
            value={pathName}
          >
            { pathName }
          </option>
        ))}
      </select>
    </div>
  )
}

export default FolderSelect
