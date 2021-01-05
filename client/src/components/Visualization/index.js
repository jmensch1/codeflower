import React from 'react'
import { useSettings } from 'store/selectors'
import ForceDirectedGraph from './ForceDirectedGraph'
import Sunburst from './Sunburst'
import VisThemeProvider from './VisThemeProvider'

const GRAPH_TYPES = {
  force: ForceDirectedGraph,
  sunburst: Sunburst,
}

const Visualization = () => {
  const { visType } = useSettings()
  const Vis = GRAPH_TYPES[visType]
  return (
    <VisThemeProvider>
      <Vis />
    </VisThemeProvider>
  )
}

export default Visualization
