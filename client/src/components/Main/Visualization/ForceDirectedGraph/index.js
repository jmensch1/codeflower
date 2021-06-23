import React, { useEffect, useCallback, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import * as d3 from 'd3'
import useKeyPressed from 'hooks/useKeyPressed'
import { useSelectedFolder, useSavedVis } from 'store/selectors'
import { setVisFuncs } from 'store/actions/vis'
import { setVisPosition } from 'store/actions/vis'
import VisHooks from './VisHooks'
import Extras from './Extras'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
    '& > svg': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      cursor: ({ inDragMode }) => (inDragMode ? 'grab' : 'default'),
      '& .file': {
        cursor: ({ inDragMode }) => (inDragMode ? 'inherit' : 'pointer'),
      },
      '& circle:not(.file)': {
        cursor: ({ inDragMode }) => (inDragMode ? 'inherit' : 'move'),
      },
    },
  },
}))

function getVisData(tree) {
  const root = d3.hierarchy(tree)

  // remove unknown languages
  const nodes = root.descendants().filter((n) => !n.data.languageUnknown)
  const links = root.links().filter((l) => !l.target.data.languageUnknown)

  // this ensures that larger nodes are on top of smaller ones,
  // and you don't get the weird look where the smaller ones are on
  // top but the links are invisible
  nodes.sort((a, b) => (a.data.size || 0) - (b.data.size || 0))

  return { nodes, links }
}

function createVis(container, tree) {
  const { nodes, links } = getVisData(tree)
  const { width, height } = container.getBoundingClientRect()

  const svg = d3
    .select(container)
    .append('svg')
    .attr('viewBox', [-width / 2, -height / 2, width, height])

  const zoomG = svg.append('g').attr('class', 'zoom')
  const rotationG = zoomG.append('g').attr('class', 'rotation')
  const linkG = rotationG.append('g').attr('class', 'links')
  const nodeG = rotationG.append('g').attr('class', 'nodes')

  const link = linkG
    .selectAll('line')
    .data(links)
    .join('line')
    .attr('class', 'link')

  const node = nodeG
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('class', (d) => (d.children ? 'folder' : 'file'))

  return { svg, zoomG, rotationG, node, link, nodes, links }
}

function restoreVis(container, tree, svgString) {
  const { nodes, links } = getVisData(tree)

  const dom = new DOMParser()
  const el = dom.parseFromString(svgString, 'image/svg+xml').rootElement
  container.appendChild(el)

  const svg = d3.select(container).select('svg')
  const zoomG = svg.select('.zoom')
  const rotationG = svg.select('.rotation')
  const linkG = svg.select('.links')
  const nodeG = svg.select('.nodes')
  const link = linkG.selectAll('line')
  const node = nodeG.selectAll('circle')

  node.nodes().forEach((el, index) => {
    nodes[index].x = parseFloat(el.getAttribute('cx'))
    nodes[index].y = parseFloat(el.getAttribute('cy'))
  })

  link.data(links)
  node.data(nodes)

  return { svg, zoomG, rotationG, node, link, nodes, links }
}

const ForceDirectedGraph = () => {
  const containerRef = useRef(null)
  const inDragMode = useKeyPressed('Shift')
  const classes = useStyles({ inDragMode })
  const tree = useSelectedFolder()
  const [visElements, setVisElements] = useState(null)
  const [alpha, setAlpha] = useState(0)
  const [restartKey, setRestartKey] = useState(0)
  const savedVis = useSavedVis()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!tree) return

    const container = containerRef.current

    const { svg, zoomG, rotationG, node, link, nodes, links } = !!savedVis
      ? restoreVis(container, tree, savedVis.getSvgString())
      : createVis(container, tree)

    const simulation = d3
      .forceSimulation()
      .on('tick', () => {
        link
          .attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y)

        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

        setAlpha(simulation.alpha())
      })
      .on('end', () => setAlpha(0))
      .stop()
      .alpha(0)

    setVisElements({
      nodes,
      links,
      svg,
      zoomG,
      rotationG,
      node,
      link,
      simulation,
    })

    return () => {
      container.innerHTML = ''
      simulation.stop().alpha(0)
      setAlpha(0)
    }
  }, [tree, savedVis, restartKey])

  useEffect(() => {
    if (!visElements) return

    const numNodes = visElements.nodes.length
    const zoom = (() => {
      if (numNodes > 2000) return 0.5
      if (numNodes > 1000) return 0.75
      if (numNodes > 250) return 1
      return 2
    })()

    dispatch(
      setVisPosition({
        zoom: {
          x: 0,
          y: 0,
          k: zoom,
        },
        rotation: 0,
      })
    )
  }, [dispatch, visElements])

  useEffect(() => {
    if (!visElements) return

    const getSvg = () => visElements.svg.node()
    dispatch(setVisFuncs({ getSvg }))
  }, [dispatch, visElements])

  const restart = useCallback(() => {
    setRestartKey((key) => 1 - key)
  }, [])

  return (
    <>
      <div ref={containerRef} className={classes.root} />
      {visElements && (
        <>
          <VisHooks visElements={visElements} inDragMode={inDragMode} />
          <Extras alpha={alpha} onRestart={restart} />
        </>
      )}
    </>
  )
}

export default ForceDirectedGraph
