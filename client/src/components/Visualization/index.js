import React, { useMemo, useCallback } from 'react'
import {
  useVisType,
  useFolderPaths,
  useSelectedFolderPath,
} from 'store/selectors'
import ForceDirectedGraph from './ForceDirectedGraph'
import Sunburst from './Sunburst'
import VisThemeProvider from './VisThemeProvider'

const GRAPH_TYPES = {
  force: ForceDirectedGraph,
  sunburst: Sunburst,
}

const Visualization = () => {
  const visType = useVisType()
  const folderPaths = useFolderPaths()
  const selectedFolderPath = useSelectedFolderPath()

  const folderClasses = useMemo(
    () =>
      folderPaths.reduce((classes, path, index) => {
        classes[path.pathName] = `folder-${index}`
        return classes
      }, {}),
    [folderPaths]
  )

  const getFullPath = useCallback(
    (partialPath) => {
      return partialPath
        ? `${selectedFolderPath}/${partialPath}`
        : selectedFolderPath
    },
    [selectedFolderPath]
  )

  const Vis = GRAPH_TYPES[visType]

  return (
    <VisThemeProvider folderClasses={folderClasses}>
      <Vis
        folderClasses={folderClasses}
        getFullPath={getFullPath}
      />
    </VisThemeProvider>
  )
}

export default Visualization
