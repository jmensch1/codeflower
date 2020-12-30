import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useFolders } from 'store/selectors'
import { selectFolder } from 'store/folders'
import Select from 'components/core/Select'
import { MAX_NODES } from 'constants.js'

const FolderSelect = () => {
  const folders = useFolders()
  const dispatch = useDispatch()

  const options = useMemo(() => {
    if (!folders || !folders.selectedFolder) return null

    return folders.folderPaths.map(({ pathName, totalNodes }) => (
      totalNodes <= MAX_NODES ? pathName : `${pathName} (${totalNodes} nodes)`
    ))
  }, [folders])

  const onChange = useCallback((e) => {
    dispatch(selectFolder(e.target.value))
  }, [dispatch])

  if (!folders || !folders.selectedFolder) return null

  return (
    <div style={{ margin: 10 }}>
      <Select
        value={folders.selectedFolder}
        onChange={onChange}
        options={options}
      />
    </div>
  )
}

export default FolderSelect
