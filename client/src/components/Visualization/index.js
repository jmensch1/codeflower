import React, { useMemo } from 'react'
import { useSettings, useLanguageCounts } from 'store/selectors'
import ForceDirectedGraph from './ForceDirectedGraph'
import Sunburst from './Sunburst'
import VisThemeProvider from './VisThemeProvider'

const GRAPH_TYPES = {
  force: ForceDirectedGraph,
  sunburst: Sunburst,
}

const Visualization = () => {
  const { visType } = useSettings()
  const counts = useLanguageCounts()

  const langClasses = useMemo(
    () =>
      counts.reduce((classes, count, index) => {
        classes[count.language] = `lang-${index}`
        return classes
      }, {}),
    [counts]
  )

  const Vis = GRAPH_TYPES[visType]

  return (
    <VisThemeProvider langClasses={langClasses}>
      <Vis langClasses={langClasses} />
    </VisThemeProvider>
  )
}

export default Visualization
