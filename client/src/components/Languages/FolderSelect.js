import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useFolderPaths, useSelectedFolderPath } from 'store/selectors'
import { selectFolder } from 'store/settings'
import Select from 'components/core/Select'
import { MAX_NODES } from 'constants.js'

const FolderSelect = () => {
  const dispatch = useDispatch()
  const selectedFolderPath = useSelectedFolderPath()
  const folderPaths = useFolderPaths()

  const options = useMemo(() => {
    if (!folderPaths) return null

    return folderPaths.map(({ pathName, totalNodes }) =>
      totalNodes <= MAX_NODES ? pathName : `${pathName} (${totalNodes} nodes)`
    )
  }, [folderPaths])

  const onChange = useCallback(
    (e) => {
      dispatch(selectFolder(e.target.value))
    },
    [dispatch]
  )

  if (!folderPaths || !selectedFolderPath) return null

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
