import React, { useCallback } from 'react'
import { useVisType, useSelectedFolderPath } from 'store/selectors'
import ForceDirectedGraph from './ForceDirectedGraph'
import Sunburst from './Sunburst'
import { TooltipProvider } from './Tooltip'

const GRAPH_TYPES = {
  force: ForceDirectedGraph,
  sunburst: Sunburst,
}

const Visualization = () => {
  const visType = useVisType()
  const selectedFolderPath = useSelectedFolderPath()

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
    <TooltipProvider>
      <Vis getFullPath={getFullPath} />
    </TooltipProvider>
  )
}

export default Visualization
