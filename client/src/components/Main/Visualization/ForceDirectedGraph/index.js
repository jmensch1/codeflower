import React, { useEffect, useCallback, useState } from 'react'
import * as d3 from 'd3'
import { makeStyles } from '@material-ui/core/styles'
import { useSelectedFolder, useCamera, useGallery } from 'store/selectors'
import useAddStyles from './useAddStyles'
import useAddForces from './useAddForces'
import useAddMouse from './useAddMouse'
import useAddZoom from './useAddZoom'
import useAddRotation from './useAddRotation'
import Extras from './Extras'
import useKeyPressed from 'hooks/useKeyPressed'

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

const Enhancers = ({ visElements, inDragMode }) => {
  const {
    svg,
    nodes,
    nodeG,
    node,
    links,
    linkG,
    link,
    simulation,
    zoomG,
  } = visElements

  useAddStyles({ svg, node, link })
  useAddForces({ simulation, nodes, links })
  useAddMouse({ node, simulation, inDragMode })
  useAddZoom({ svg, zoomG })
  useAddRotation({ nodeG, linkG })

  return null
}

const ForceDirectedGraph = () => {
  /*
    NOTE: hold shift to enter drag mode. This will disable the tooltip
    and node-drag functionality, which is useful when the nodes are so
    large that they fill all or most of the screen, and would effectively
    block the full-vis-drag functionality from d3.zoom.
  */
  const inDragMode = useKeyPressed('Shift')
  const classes = useStyles({ inDragMode })
  const tree = useSelectedFolder()
  const [visElements, setVisElements] = useState(null)
  const [alpha, setAlpha] = useState(0)
  const [restartKey, setRestartKey] = useState(0)
  const { showAperture } = useCamera()
  const { svgString, savedVis } = useGallery()

  useEffect(() => {
    if (!tree) return

    //// DATA ////

    const root = d3.hierarchy(tree)

    // remove unknown languages
    const nodes = root.descendants().filter((n) => !n.data.languageUnknown)
    const links = root.links().filter((l) => !l.target.data.languageUnknown)

    // this ensures that larger nodes are on top of smaller ones,
    // and you don't get the weird look where the smaller ones are on
    // top but the links are invisible
    nodes.sort((a, b) => (a.data.size || 0) - (b.data.size || 0))

    //// DOM ////

    const container = document.querySelector('#vis-container')

    let svg, zoomG, linkG, link, nodeG, node

    // TODO: probably take out the else block, no need for svgString
    if (true || !svgString) {

      const { width, height } = container.getBoundingClientRect()
      svg = d3
        .select(container)
        .append('svg')
        .attr('viewBox', [-width / 2, -height / 2, width, height])

      // highlight the viewbox (testing only)
      // svg
      //   .append('rect')
      //   .attr('x', -width / 2)
      //   .attr('y', -height / 2)
      //   .attr('width', width)
      //   .attr('height', height)
      //   .style('stroke', 'red')
      //   .style('stroke-width', 4)
      //   .style('fill', 'transparent')
      //
      // svg.append('circle')
      //   .attr('cx', 0)
      //   .attr('cy', 0)
      //   .attr('r', 10)
      //   .style('stroke', 'red')
      //   .style('stroke-width', 4)
      //   .style('fill', 'transparent')

      zoomG = svg.append('g').attr('class', 'graph')

      linkG = zoomG.append('g').attr('class', 'links')

      link = linkG
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('class', 'link')

      nodeG = zoomG.append('g').attr('class', 'nodes')

      node = nodeG
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('class', (d) => (d.children ? 'folder' : 'file'))

    } else {

      const decoded = atob(svgString.replace('data:image/svg+xml;base64,', ''))
      const dom = new DOMParser()
      const el = dom.parseFromString(decoded, 'image/svg+xml').rootElement
      container.appendChild(el)

      svg = d3.select(container).select('svg')
      linkG = svg.select('.links')
      link = linkG.selectAll('line').data(links)
      nodeG = svg.select('.nodes')
      node = nodeG.selectAll('circle').data(nodes)

    }

    //// SIMULATION ////

    const simulation = d3.forceSimulation().stop()

    const onTick = () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

      setAlpha(simulation.alpha())
    }

    simulation.on('tick', onTick).on('end', () => setAlpha(0))

    //// RESTORE ////

    if (savedVis) {
      console.log('restoring')

      // restore node positions
      nodes.forEach((node, index) => {
        node.x = savedVis[index].x
        node.y = savedVis[index].y
      })

      // set alpha to 0 so there's no movement when you drag
      simulation.alpha(0)

      // draw the vis
      onTick()

      // prevent flash caused by applying zoom transform
      nodeG.style('display', 'none')
      linkG.style('display', 'none')
      setTimeout(() => {
        nodeG.style('display', 'block')
        linkG.style('display', 'block')
      }, 500)
    }

    //// SAVE ////

    window.saveVis = () => {
      return nodes.map(node => ({
        x: node.x,
        y: node.y,
      }))
    }

    //// FINISH ////

    setVisElements({ svg, nodes, nodeG, node, links, linkG, link, simulation, zoomG })
    return () => {
      container.innerHTML = ''
    }
  }, [tree, svgString, savedVis, restartKey])

  const restart = useCallback(() => {
    setRestartKey((key) => 1 - key)
  }, [])

  return (
    <>
      <div className={classes.root} id="vis-container" />
      {visElements && (
        <>
          <Enhancers visElements={visElements} inDragMode={inDragMode} />
          {!showAperture && <Extras alpha={alpha} onRestart={restart} />}
        </>
      )}
    </>
  )
}

export default ForceDirectedGraph
