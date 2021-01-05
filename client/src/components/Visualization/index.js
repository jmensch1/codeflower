import React, { useMemo } from 'react'
import { useSettings } from 'store/selectors'
import ForceDirectedGraph from './ForceDirectedGraph'
import Sunburst from './Sunburst'
import VisThemeProvider from './VisThemeProvider'
import { useLanguages } from 'store/selectors'

const GRAPH_TYPES = {
  force: ForceDirectedGraph,
  sunburst: Sunburst,
}

const Visualization = () => {
  const { visType } = useSettings()
  const { counts } = useLanguages()

  const langClasses = useMemo(() => {
    if (!counts) return null

    return counts.reduce((classes, count, index) => {
      classes[count.language] = `lang-${index}`
      return classes
    }, {})
  }, [counts])

  const Vis = GRAPH_TYPES[visType]

  return (
    <VisThemeProvider langClasses={langClasses}>
      <Vis langClasses={langClasses} />
    </VisThemeProvider>
  )
}

export default Visualization
