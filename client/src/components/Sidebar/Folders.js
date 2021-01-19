import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import {
  useFolderPaths,
  useSelectedFolderPath,
  useHighlightedFolderPath,
} from 'store/selectors'
import { selectFolder, highlightFolder } from 'store/actions/settings'
import { MAX_NODES } from 'constants.js'

const useStyles = makeStyles((theme) => ({
  root: {
    // makes the hover background full width
    // even when horizontal scrollbar is present
    display: 'table',
    width: '100%',
  },
  listItem: {
    fontSize: 14,
    padding: '0 0.5em',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    color: theme.palette.text.disabled,
    '&.selected': {
      color: theme.palette.text.primary,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))

function isWithinFolder(folderPath, targetFolderPath) {
  return (
    folderPath.startsWith(`${targetFolderPath}/`) ||
    folderPath === targetFolderPath
  )
}

const Folders = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedFolderPath = useSelectedFolderPath()
  const highlightedFolderPath = useHighlightedFolderPath()
  const folderPaths = useFolderPaths()

  const select = useCallback(
    (folderPath) => {
      dispatch(selectFolder(folderPath))
    },
    [dispatch]
  )

  const highlight = useCallback(
    (folderPath) => {
      if (folderPath && isWithinFolder(folderPath, selectedFolderPath))
        dispatch(highlightFolder(folderPath))
      else if (highlightedFolderPath) dispatch(highlightFolder(null))
    },
    [dispatch, selectedFolderPath, highlightedFolderPath]
  )

  const clearHighlight = useCallback(() => {
    dispatch(highlightFolder(null))
  }, [dispatch])

  return (
    <div className={classes.root} onMouseLeave={clearHighlight}>
      {folderPaths.map(({ pathName, totalNodes }) => {
        const sections = pathName.split('/')
        const name = sections[sections.length - 1]
        const selected = isWithinFolder(pathName, selectedFolderPath)
        return (
          <div
            key={pathName}
            className={clsx(classes.listItem, { selected })}
            onMouseEnter={() => highlight(pathName)}
            onClick={() => select(pathName)}
          >
            <span
              style={{
                display: 'inline-block',
                width: `${1.2 * (sections.length - 1)}em`,
              }}
            />
            <Typography
              variant="caption"
              style={{
                textDecoration:
                  pathName === selectedFolderPath ? 'underline' : undefined,
              }}
            >
              {totalNodes <= MAX_NODES ? name : `${name} (${totalNodes} nodes)`}
            </Typography>
          </div>
        )
      })}
    </div>
  )
}

export default Folders
