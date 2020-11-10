import React, { useState } from 'react'
import ForceDirectedGraph from './ForceDirectedGraph'
import Sunburst from './Sunburst'

const GRAPH_TYPES = {
  force: ForceDirectedGraph,
  sunburst: Sunburst,
}

const Visualization = () => {
  const [graphType, setGraphType] = useState('sunburst')

  const Vis = GRAPH_TYPES[graphType]

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 50,
          right: 10,
          zIndex: 1,
        }}
      >
        <select
          value={graphType}
          onChange={e => setGraphType(e.target.value)}
        >
          {Object.keys(GRAPH_TYPES).map(type => (
            <option key={type} value={type}>{ type }</option>
          ))}
        </select>
      </div>
      <Vis />
    </>
  )
}

export default Visualization
