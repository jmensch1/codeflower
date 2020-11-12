import React from 'react'
import { useSettings } from 'store/selectors'
import ForceDirectedGraph from './ForceDirectedGraph'
import Sunburst from './Sunburst'

const GRAPH_TYPES = {
  force: ForceDirectedGraph,
  sunburst: Sunburst,
}

const Visualization = () => {
  const { visType } = useSettings()
  const Vis = GRAPH_TYPES[visType]
  return <Vis />
}

export default Visualization
