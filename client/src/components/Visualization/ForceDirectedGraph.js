import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { createUseStyles } from 'react-jss'
import { useTree } from 'store/selectors'

const useStyles = createUseStyles(theme => {
  return {
    root: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      ...theme.visualization.default,
      ...theme.visualization.force,
    }
  }
})

const ForceDirectedGraph = () => {
  const container = useRef(null)
  const classes = useStyles()
  const tree = useTree()

  useEffect(() => {
    if (!tree) return

    const drag = simulation => {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      }

      function dragged(event, d) {
        d.fx = event.x
        d.fy = event.y
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    }

    const root = d3.hierarchy(tree)
    const links = root.links()
    const nodes = root.descendants()

    const width = container.current.offsetWidth
    const height = container.current.offsetHeight

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(0).strength(1))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('x', d3.forceX())
      .force('y', d3.forceY())

    const svg = d3
      .select(container.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])

    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
        .attr('class', 'link')

    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
        .attr('class', d => !!d.children ? 'directory' : ('file ' + d.data.class))
        .attr('r', d => d.children ? 3.5 : Math.pow(d.data.size, 2/5) || 1)
        .call(drag(simulation))

    const text = svg
      .append('text')
      .attr('class', 'nodetext')
      .attr('dx', 0)
      .attr('dy', 0)
      .attr('text-anchor', 'middle')

    node
      .on('mouseover', (e, d) => {
        const dy = d.y - 5 - (d.children ? 3.5 : Math.sqrt(d.data.size) / 2)
        text
          .attr('transform', `translate(${d.x},${dy})`)
          .text(d.data.name)
          .style('display', null)
      })
      .on('mouseout', (e, d) => text.style('display', 'none'))

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
    })

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

export default ForceDirectedGraph
