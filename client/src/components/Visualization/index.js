import React from 'react'
import { useVisType } from 'store/selectors'
import ForceDirectedGraph from './ForceDirectedGraph'
import Sunburst from './Sunburst'
import { TooltipProvider } from './Tooltip'

const GRAPH_TYPES = {
  force: ForceDirectedGraph,
  sunburst: Sunburst,
}

const Visualization = () => {
  const visType = useVisType()
  const VisComponent = GRAPH_TYPES[visType]

  return (
    <TooltipProvider>
      <VisComponent />
    </TooltipProvider>
  )
}

export default Visualization
