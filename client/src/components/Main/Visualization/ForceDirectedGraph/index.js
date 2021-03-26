import React, { useEffect, useCallback, useState, useRef, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import * as d3 from 'd3'
import useKeyPressed from 'hooks/useKeyPressed'
import { useSelectedFolder, useCamera, useSavedVis } from 'store/selectors'
import { setVisFuncs } from 'store/actions/vis'
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

const ForceDirectedGraph = () => {
  const containerRef = useRef(null)
  const inDragMode = useKeyPressed('Shift')
  const classes = useStyles({ inDragMode })
  const tree = useSelectedFolder()
  const [visElements, setVisElements] = useState(null)
  const [alpha, setAlpha] = useState(0)
  const [restartKey, setRestartKey] = useState(0)
  const { showAperture } = useCamera()
  const savedVis = useSavedVis()
  const dispatch = useDispatch()

  const visData = useMemo(() => {
    if (!tree) return null

    const root = d3.hierarchy(tree)

    // remove unknown languages
    const nodes = root.descendants().filter((n) => !n.data.languageUnknown)
    const links = root.links().filter((l) => !l.target.data.languageUnknown)

    // this ensures that larger nodes are on top of smaller ones,
    // and you don't get the weird look where the smaller ones are on
    // top but the links are invisible
    nodes.sort((a, b) => (a.data.size || 0) - (b.data.size || 0))

    return {
      nodes,
      links,
      saved: savedVis,
    }
  }, [tree, savedVis])

  useEffect(() => {
    if (!visData) return

    //// DOM ////

    const container = containerRef.current
    let svg, zoomG, rotationG, linkG, nodeG, link, node

    if (visData.saved) {

      const svgString = visData.saved.getSvgString()
      const dom = new DOMParser()
      const el = dom.parseFromString(svgString, 'image/svg+xml').rootElement
      container.appendChild(el)

      svg = d3.select(container).select('svg')
      zoomG = svg.select('.zoom')
      rotationG = svg.select('.rotation')
      linkG = svg.select('.links')
      nodeG = svg.select('.nodes')
      link = linkG.selectAll('line')
      node = nodeG.selectAll('circle')

      node.nodes().forEach((el, index) => {
        visData.nodes[index].x = parseFloat(el.getAttribute('cx'))
        visData.nodes[index].y = parseFloat(el.getAttribute('cy'))
      })

      link.data(visData.links)
      node.data(visData.nodes)

    } else {
      const { width, height } = container.getBoundingClientRect()

      svg = d3
        .select(container)
        .append('svg')
        .attr('viewBox', [-width / 2, -height / 2, width, height])

      zoomG = svg.append('g').attr('class', 'zoom')
      rotationG = zoomG.append('g').attr('class', 'rotation')
      linkG = rotationG.append('g').attr('class', 'links')
      nodeG = rotationG.append('g').attr('class', 'nodes')

      link = linkG
        .selectAll('line')
        .data(visData.links)
        .join('line')
        .attr('class', 'link')

      node = nodeG
        .selectAll('circle')
        .data(visData.nodes)
        .join('circle')
        .attr('class', (d) => (d.children ? 'folder' : 'file'))
    }

    //// SIMULATION ////

    const simulation = d3.forceSimulation().stop().alpha(0)

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

    //// FINISH ////

    setVisElements({ svg, node, link, simulation, zoomG, rotationG })

    return () => {
      container.innerHTML = ''
    }
  }, [visData, restartKey])

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
      {visData && visElements && (
        <>
          <VisHooks
            visData={visData}
            visElements={visElements}
            inDragMode={inDragMode}
          />
          {!showAperture && (
            <Extras
              alpha={alpha}
              onRestart={restart}
            />
          )}
        </>
      )}
    </>
  )
}

export default ForceDirectedGraph
