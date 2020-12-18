import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { makeStyles } from '@material-ui/core/styles'
import { useTree, useLanguages } from 'store/selectors'
import { getFile } from 'store/files'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    ...theme.visualization.default,
    ...theme.visualization.force,
    ...theme.languages,
    '& svg': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      '& .file': {
        cursor: 'pointer',
      },
      '& circle:not(.file)': {
        cursor: 'move',
      },
    },
  },
  tooltip: {
    position: 'absolute',
    visibility: 'hidden',
    backgroundColor: '#3d3d3d',
    color: 'white',
    borderRadius: '5px',
    padding: '5px 10px',
    transform: 'translate(-50%, -150%)',
    pointerEvents: 'none',
  },
}))

const ForceDirectedGraph = () => {
  const container = useRef(null)
  const tooltip = useRef(null)
  const classes = useStyles()
  const tree = useTree()
  const dispatch = useDispatch()
  const { classes: langClasses } = useLanguages()

  useEffect(() => {
    if (!tree) return

    //// SETUP ////

    const root = d3.hierarchy(tree)
    const links = root.links()
    const nodes = root.descendants()

    const width = container.current.offsetWidth
    const height = container.current.offsetHeight

    let dragging = false

    const svg = d3
      .select(container.current)
      .append('svg')
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
        .attr('class', d => !!d.children ? 'directory' : ('file ' + langClasses[d.data.language]))
        .attr('r', d => d.children ? 3.5 : Math.pow(d.data.size, 2/5) || 1)

    //// SIMULATION ////

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3
        .forceLink(links)
        .id(d => d.id)
        .distance(d => d.children ? 40 : 10)
        .strength(1)
      )
      .force('charge', d3
        .forceManyBody()
        .strength(d => d.children ? -d.size / 300 : -150)
      )
      .force('x', d3.forceX())
      .force('y', d3.forceY())

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

    //// DRAGGING ////

    const drag = simulation => {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
        dragging = true
      }

      function dragged(event, d) {
        d.fx = event.x
        d.fy = event.y
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
        dragging = false
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    }

    node.call(drag(simulation))

    //// ZOOMING ////

    svg.call(d3.zoom()
        .scaleExtent([0.1, 10])
        .on('zoom', zoomed))

    function zoomed({ transform }) {
      node.attr('transform', transform)
      link.attr('transform', transform)
    }

    //// TOOLTIP ////

    const tt = d3.select(tooltip.current)

    node
      .on('mouseover', () => {
        if (!dragging)
          tt.style('visibility', 'visible')
      })
      .on('mousemove', (e, d) => {
        tt
          .style('top', `${e.offsetY}px`)
          .style('left',`${e.offsetX}px`)
          .html(d.data.name)
      })
      .on('mouseout', () => tt.style('visibility', 'hidden'))

    //// GET FILE ////

    node.on('click', (e, d) => {
      if (d.children) return
      const path = d
        .ancestors()
        .map(d => d.data.name)
        .reverse()
        .join('/')
        .replace(/^root/, '')
      dispatch(getFile(path))
    })

    //// CLEANUP ////

    const containerCurrent = container.current
    const tooltipCurrent = tooltip.current
    return () => {
      containerCurrent.innerHTML = ''
      tooltipCurrent.innerHTML = ''
    }
  }, [tree, langClasses, dispatch])

  if (!tree) return null
  return (
    <>
      <div ref={container} className={classes.root} />
      <div ref={tooltip} className={classes.tooltip} />
    </>
  )
}

export default ForceDirectedGraph
