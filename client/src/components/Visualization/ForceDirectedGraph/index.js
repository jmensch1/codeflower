import React, { useEffect, useCallback, useState } from 'react'
import * as d3 from 'd3'
import { makeStyles } from '@material-ui/core/styles'
import { useSelectedFolder, useLanguageIds, useFolderIds } from 'store/selectors'
import { openModal } from 'store/actions/modals'
import { useDispatch } from 'react-redux'
import { useTooltip } from '../Tooltip'
import clsx from 'clsx'
import Controls from './Controls'

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

const INITIAL_FORCES =  {
  alphaDecay: 0.0228,
  center: {
    enabled: true,
    strength: 1,
  },
  charge: {
    enabled: true,
    strength: -200,
    distanceMin: 1,
    distanceMax: 2000,
  },
  collide: {
    enabled: false,
    strength: 0.7,
    iterations: 1,
    radius: 5
  },
  forceX: {
    enabled: true,
    strength: 0.4,
  },
  forceY: {
    enabled: true,
    strength: 0.4,
  },
  link: {
    enabled: true,
    distance: 10,
    iterations: 4,
    strength: 1,
    distanceInner: 10,
    distanceOuter: 10,
  },
  files: {
    radius: {
      exponent: 0.4,
    },
  },
}

const INITIAL_DISPLAY = {
  files: {
    radius: {
      coeff: 1.0,
      exponent: 0.4,
    },
  },
}

const ForceDirectedGraph = ({ getFullPath }) => {
  const [alpha, setAlpha] = useState(0)
  const classes = useStyles()
  const tree = useSelectedFolder()
  const dispatch = useDispatch()
  const languageIds = useLanguageIds()
  const folderIds = useFolderIds()
  const [forces, setForces] = useState(INITIAL_FORCES)
  const [display, setDisplay] = useState(INITIAL_DISPLAY)
  const [restart, setRestart] = useState(0)
  const [simulation, setSimulation] = useState(null)
  const [node, setNode] = useState(null)
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
      // .attr('r', (d) => (d.children ? 3.5 : Math.pow(d.data.size, 2 / 5) || 1))

    //// SIMULATION ////

    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink().links(links))
      .force('charge', d3.forceManyBody())
      .force('collide', d3.forceCollide())
      .force('center', d3.forceCenter())
      .force('forceX', d3.forceX())
      .force('forceY', d3.forceY())
      .stop()

    // const simulation = d3
    //   .forceSimulation(nodes)
    //   .force(
    //     'link',
    //     d3
    //       .forceLink(links)
    //       .id((d) => d.id)
    //       .distance(5)
    //       // .distance((d) => {
    //       //   console.log('d:', d)
    //       //   // return d.target.children ? 5 : 10
    //       //   return d.target.data.size ? Math.pow(d.target.data.size, 2 / 5) || 1 : 10
    //       // })
    //       //.distance((d) => (d.children ? 3.5 : Math.pow(d.data.size, 2 / 5) || 1))
    //       .strength(1)
    //       // .iterations(4)
    //   )
    //   // .force(
    //   //   'collide',
    //   //   d3.forceCollide().iterations(5).radius((d) => d.children ? 3.5 : Math.pow(d.data.size, 2 / 5) || 1)
    //   // )
    //   .force(
    //     'charge',
    //     d3.forceManyBody().strength((d) => (d.children ? -500 : -150))
    //   )
    //   // .force('center', d3.forceCenter())
    //   // TODO: maybe make strength proportional to number of nodes (nodes.length)
    //   .force('x', d3.forceX().strength(0.4))
    //   .force('y', d3.forceY().strength(0.4))
    //   // .force('radial', d3.forceRadial().radius(height / 2))
    //   .alphaDecay(0.0028)

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

      setAlpha(simulation.alpha())
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
    return () => { container.innerHTML = '' }
  }, [tree, languageIds, folderIds, getNodePath, dispatch, setTooltip, restart])

  useEffect(() => {
    if (!simulation || !forces) return

    simulation.force('center')
      .strength(forces.center.strength * forces.center.enabled)
    simulation.force('charge')
      .strength(forces.charge.strength * forces.charge.enabled)
      .distanceMin(forces.charge.distanceMin)
      .distanceMax(forces.charge.distanceMax)
    simulation.force('collide')
      .strength(forces.collide.strength * forces.collide.enabled)
      .radius(forces.collide.radius)
      .iterations(forces.collide.iterations)
    simulation.force('forceX')
      .strength(forces.forceX.strength * forces.forceX.enabled)
    simulation.force('forceY')
      .strength(forces.forceY.strength * forces.forceY.enabled)
    simulation.force('link')
      .distance((d) => d.target.children ? forces.link.distanceInner : forces.link.distanceOuter)
      .strength(forces.link.strength)
      .iterations(forces.link.iterations)

    simulation.alphaDecay(forces.alphaDecay)

    simulation.alpha(1).restart()
  }, [simulation, forces])

  useEffect(() => {
    if (!node || !display) return

    const { coeff, exponent } = display.files.radius
    node.attr('r', (d) => (d.children ? 3.5 : coeff * Math.pow(d.data.size, exponent) || 1))
  }, [node, display])

  // const jiggle = useCallback(() => {
  //   simulation.alpha(0.8).restart()
  // }, [simulation])

  if (!tree) return null
  return (
    <>
      <div id='fdg-container' className={classes.root} />
      <Controls
        alpha={alpha}
        forces={forces}
        onChangeForces={setForces}
        display={display}
        onChangeDisplay={setDisplay}
        // onJiggle={jiggle}
        onJiggle={() => setRestart(1 - restart)}
      />
    </>
  )
}

export default ForceDirectedGraph
