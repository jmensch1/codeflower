import React, { useEffect, useCallback, useState } from 'react'
import * as d3 from 'd3'
import { makeStyles } from '@material-ui/core/styles'
import { useSelectedFolder, useLanguageIds, useFolderIds } from 'store/selectors'
import { openModal } from 'store/actions/modals'
import { useDispatch } from 'react-redux'
import { useTooltip } from '../Tooltip'
import clsx from 'clsx'
import Activate from './Activate'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    ...theme.visualization.default,
    ...theme.visualization.force,
    ...theme.dynamic,
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
}))

const ForceDirectedGraph = ({ getFullPath }) => {
  const classes = useStyles()
  const tree = useSelectedFolder()
  const dispatch = useDispatch()
  const languageIds = useLanguageIds()
  const folderIds = useFolderIds()
  const [restart, setRestart] = useState(0)
  const [simulation, setSimulation] = useState(null)
  const [node, setNode] = useState(null)
  const [nodes, setNodes] = useState(null)
  const [links, setLinks] = useState(null)
  const setTooltip = useTooltip()

  const getNodePath = useCallback(
    (node) => {
      const partialPath = node
        .ancestors()
        .map((d) => d.data.name)
        .reverse()
        .slice(1)
        .join('/')
      return getFullPath(partialPath)
    },
    [getFullPath]
  )

  useEffect(() => {
    if (!tree) return

    //// SETUP ////

    const root = d3.hierarchy(tree)
    const links = root.links()
    const nodes = root.descendants()

    const container = document.getElementById('fdg-container')

    const width = container.offsetWidth
    const height = container.offsetHeight

    const svg = d3
      .select(container)
      .append('svg')
      .attr('viewBox', [-width / 2, -height / 2, width, height])

    // this ensures that larger nodes are on top of smaller ones,
    // and you don't get the weird look where the smaller ones are on
    // top but the links are invisible
    nodes.sort((a, b) => (a.data.size || 0) - (b.data.size || 0))

    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('class', (d) =>
        clsx(
          'link',
          `folder-${folderIds[getNodePath(d.source)]}`,
        )
      )

    const node = svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('class', (d) =>
        d.children
          ? clsx(
            'folder',
            `folder-${folderIds[getNodePath(d)]}`,
          )
          : clsx(
              'file',
              `lang-${languageIds[d.data.language]}`,
              d.parent && `folder-${folderIds[getNodePath(d.parent)]}`,
              ...d.data.authorIds.map((authorId) => `author-${authorId}`)
            )
      )

    //// SIMULATION ////

    const simulation = d3.forceSimulation().stop()
      // .forceSimulation(nodes)
      // .force('link', d3.forceLink().links(links))
      // .force('charge', d3.forceManyBody())
      // .force('collide', d3.forceCollide())
      // .force('center', d3.forceCenter())
      // .force('forceX', d3.forceX())
      // .force('forceY', d3.forceY())
      // .stop()

    simulation.on('tick.main', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
    })

    //// DRAGGING ////

    const drag = (simulation) => {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
        setTooltip(null)
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

      return d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    }

    node.call(drag(simulation))

    //// ZOOMING ////

    svg.call(d3.zoom().scaleExtent([0.1, 10]).on('zoom', zoomed))

    function zoomed({ transform }) {
      node.attr('transform', transform)
      link.attr('transform', transform)
    }

    //// TOOLTIP ////

    node
      .on('mousemove', (e, d) => {
        setTooltip({
          x: e.offsetX,
          y: e.offsetY,
          content: d.children
            ? d.data.name
            : `${d.data.name} (${d.data.size} loc)`,
        })
      })
      .on('mouseout', () => setTooltip(null))

    //// GET FILE ////

    node.on('click', (e, d) => {
      if (d.children) return
      dispatch(
        openModal('fileViewer', {
          filePath: getNodePath(d),
          metadata: d.data,
        })
      )
    })

    //// CLEANUP ////

    setSimulation(simulation)
    setNode(node)
    setNodes(nodes)
    setLinks(links)
    return () => { container.innerHTML = '' }
  }, [tree, languageIds, folderIds, getNodePath, dispatch, setTooltip, restart])

  if (!tree) return null
  return (
    <>
      <div id='fdg-container' className={classes.root} />
      <Activate
        simulation={simulation}
        node={node}
        nodes={nodes}
        links={links}
        restart={() => setRestart(1 - restart)}
      />
    </>
  )
}

export default ForceDirectedGraph
