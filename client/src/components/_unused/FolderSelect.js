import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useFolderPaths, useSelectedFolderPath } from 'store/selectors'
import { selectFolder, highlightFolder } from 'store/actions/settings'
import Select from 'components/core/Select'
import { MAX_NODES } from 'constants.js'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  listItem: {
    fontSize: 14,
    opacity: 0.4,
    padding: '2px 10px 2px 5px',
    borderLeft: '1px white solid',
    '&:hover': {
      backgroundColor: theme.palette.grey[700],
    },
    '&.selected': {
      // borderLeft: '1px white solid',
      opacity: 1.0,
      // paddingLeft: 3,
      // borderLeftWidth: 3,
    },
  },
}))

const FolderSelect = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedFolderPath = useSelectedFolderPath()
  const folderPaths = useFolderPaths()

  const options = useMemo(() => {
    return folderPaths.map(({ pathName, totalNodes }) =>
      totalNodes <= MAX_NODES ? pathName : `${pathName} (${totalNodes} nodes)`
    )
  }, [folderPaths])

  const onChange = useCallback(
    (folderPath) => {
      dispatch(selectFolder(folderPath))
    },
    [dispatch]
  )

  const onHover = useCallback(
    (folderPath) => {
      if (folderPath && folderPath.startsWith(selectedFolderPath))
        dispatch(highlightFolder(folderPath))
    },
    [dispatch, selectedFolderPath]
  )

  if (!selectedFolderPath) return null

  return (
    <div style={{ margin: 10 }}>
      <Select
        value={selectedFolderPath}
        options={options}
        onChange={onChange}
        onHover={onHover}
        renderOption={(filePath) => {
          const sections = filePath.split('/')
          const name = sections[sections.length - 1]
          const selected = filePath.startsWith(selectedFolderPath)
          return (
            <div className={clsx(classes.listItem, { selected })}>
              <span style={{ visibility: 'hidden' }}>
                {'a'.repeat(2 * (sections.length - 1))}
              </span>
              {name}
            </div>
          )
        }}
      />
    </div>
  )
}

export default FolderSelect
