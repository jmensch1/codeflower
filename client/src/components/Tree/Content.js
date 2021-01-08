import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {
  useFolderPaths,
  useSelectedFolderPath,
  useHighlightedFolderPath
} from 'store/selectors'
import { selectFolder, highlightFolder } from 'store/actions/settings'
import { MAX_NODES } from 'constants.js'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  listItem: {
    fontSize: 14,
    opacity: 0.4,
    padding: '0 0.25em',
    cursor: 'pointer',
    // borderLeft: '1px white solid',
    // transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.grey[900],
    },
    '&.selected': {
      // borderLeft: '1px white solid',
      opacity: 1.0,
      // paddingLeft: 3,
      // borderLeftWidth: 3,
    },
  }
}))

const FolderSelect = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedFolderPath = useSelectedFolderPath()
  const highlightedFolderPath = useHighlightedFolderPath()
  const folderPaths = useFolderPaths()

  const select = useCallback((folderPath) => {
    dispatch(selectFolder(folderPath))
  }, [dispatch])

  const highlight = useCallback((folderPath) => {
    if (folderPath && folderPath.startsWith(selectedFolderPath))
      dispatch(highlightFolder(folderPath))
    else if (highlightedFolderPath)
      dispatch(highlightFolder(null))
  }, [dispatch, selectedFolderPath, highlightedFolderPath])

  return (
    <div onMouseLeave={() => highlight(null)}>
      {folderPaths.map(({ pathName, totalNodes }) => {
        const sections = pathName.split('/')
        const name = sections[sections.length - 1]
        const selected = pathName.startsWith(selectedFolderPath)
        return (
          <div
            key={pathName}
            className={clsx(classes.listItem, { selected })}
            onMouseEnter={() => highlight(pathName)}
            onClick={() => select(pathName)}
          >
            <span style={{
              display: 'inline-block',
              width: `${1.5 * (sections.length - 1)}em`
            }} />
            <Typography variant='caption'>
              { totalNodes <= MAX_NODES ? name : `${name} (${totalNodes} nodes)` }
            </Typography>
          </div>
        )
      })}
    </div>
  )
}

export default FolderSelect
