import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useFolderPaths, useSelectedFolderPath } from 'store/selectors'
import { selectFolder, highlightFolder } from 'store/actions/settings'
import Select from 'components/core/Select'
import { MAX_NODES } from 'constants.js'

const FolderSelect = () => {
  const dispatch = useDispatch()
  const selectedFolderPath = useSelectedFolderPath()
  const folderPaths = useFolderPaths()

  const options = useMemo(() => {
    return folderPaths.map(({ pathName, totalNodes }) =>
      totalNodes <= MAX_NODES ? pathName : `${pathName} (${totalNodes} nodes)`
    )
  }, [folderPaths])

  const onChange = useCallback((folderPath) => {
    dispatch(selectFolder(folderPath))
  }, [dispatch])

  const onHover = useCallback((folderPath) => {
    dispatch(highlightFolder(folderPath))
  }, [dispatch])

  if (!selectedFolderPath) return null

  return (
    <div style={{ margin: 10 }}>
      <Select
        value={selectedFolderPath}
        options={options}
        onChange={onChange}
        onHover={onHover}
      />
    </div>
  )
}

export default FolderSelect
