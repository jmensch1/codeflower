import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { createUseStyles } from 'react-jss'
import { useTree } from 'store/selectors'

const RADIUS_RATIO = 0.9
const PAD_ANGLE = 0 // 0.005

const useStyles = createUseStyles(theme => {
  return {
    root: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      ...theme.visualization.default,
      ...theme.visualization.sunburst,
    }
  }
})

const Sunburst = () => {
  const container = useRef(null)
  const classes = useStyles()
  const tree = useTree()

  useEffect(() => {
    if (!tree) return

    const width = container.current.offsetWidth
    const height = container.current.offsetHeight
    const radius = RADIUS_RATIO * Math.min(width, height) / 2
    const format = d3.format(',d')

    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, PAD_ANGLE))
      .padRadius(radius / 2)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1 - 1)

    const partition = data => d3.partition()
        .size([2 * Math.PI, radius])
      (d3.hierarchy(data)
        .sum(d => d.size)
        .sort((a, b) => b.size - a.size))

    const root = partition(tree)

    const svg = d3
      .select(container.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])

    svg.append('g')
      .selectAll('path')
      .data(root.descendants().filter(d => d.depth))
      .join('path')
        .attr('class', d => !!d.children ? 'directory' : ('file ' + d.data.class))
        .attr('d', arc)
      .append('title')
        .text(d => {
          const path = d.ancestors().map(d => d.data.name).reverse().join('/')
          const loc = format(d.data.size)
          return `${path}\n(${loc} loc)`
        })

    // svg.append('g')
    //     .attr('pointer-events', 'none')
    //     .attr('text-anchor', 'middle')
    //     .attr('font-size', 10)
    //     .attr('font-family', 'sans-serif')
    //   .selectAll('text')
    //   .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
    //   .join('text')
    //     .attr('transform', function(d) {
    //       const x = (d.x0 + d.x1) / 2 * 180 / Math.PI
    //       const y = (d.y0 + d.y1) / 2
    //       return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
    //     })
    //     .attr('dy', '0.35em')
    //     .text(d => d.data.name + (d.data.size ? ` (${d.data.size})` : ''))

    const containerCurrent = container.current
    return () => containerCurrent.innerHTML = ''
  }, [tree])

  if (!tree) return null
  return (
    <div
      ref={container}
      className={classes.root}
    />
  )
}

export default Sunburst
