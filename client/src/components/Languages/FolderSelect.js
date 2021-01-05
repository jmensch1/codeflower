import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useFolders, useSelectedFolderPath } from 'store/selectors'
import { selectFolder } from 'store/settings'
import Select from 'components/core/Select'
import { MAX_NODES } from 'constants.js'

const FolderSelect = () => {
  const folders = useFolders()
  const dispatch = useDispatch()
  const selectedFolderPath = useSelectedFolderPath()

  const options = useMemo(() => {
    if (!folders || !selectedFolderPath) return null

    return folders.folderPaths.map(({ pathName, totalNodes }) =>
      totalNodes <= MAX_NODES ? pathName : `${pathName} (${totalNodes} nodes)`
    )
  }, [folders, selectedFolderPath])

  const onChange = useCallback(
    (e) => {
      dispatch(selectFolder(e.target.value))
    },
    [dispatch]
  )

  if (!folders || !selectedFolderPath) return null

  return (
    <div style={{ margin: 10 }}>
      <Select
        value={selectedFolderPath}
        onChange={onChange}
        options={options}
      />
    </div>
  )
}

export default FolderSelect
