import React, { useRef, useEffect, useCallback } from 'react'
import * as d3 from 'd3'
import { makeStyles } from '@material-ui/core/styles'
import { useSelectedFolder, useLanguageIds, useFolderIds } from 'store/selectors'
import { openModal } from 'store/actions/modals'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'

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
  controls: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    width: 300,
    borderRadius: 5,
    backgroundColor: theme.palette.background.paper,
  },
  alphaBar: {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 400,
    // backgroundColor: 'red',
    height: 50,
  },
  alphaInner: {
    height: '100%',
    backgroundColor: 'blue',
  }
}))

const ForceDirectedGraph = ({ getFullPath }) => {
  const container = useRef(null)
  const tooltip = useRef(null)
  const slider = useRef(null)
  const jiggler = useRef(null)
  const alpha = useRef(null)
  const classes = useStyles()
  const tree = useSelectedFolder()
  const dispatch = useDispatch()
  const languageIds = useLanguageIds()
  const folderIds = useFolderIds()

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

    const width = container.current.offsetWidth
    const height = container.current.offsetHeight

    let dragging = false

    const svg = d3
      .select(container.current)
      .append('svg')
      .attr('viewBox', [-width / 2, -height / 2, width, height])

    // this ensures that larger nodes are on top of smaller ones,
    // and you don't get the weird look where the smaller ones are on
    // top but the links are invisible
    nodes.sort((a, b) => (a.data.size || 0) - (b.data.size || 0))

    console.log(nodes)

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
      .attr('r', (d) => (d.children ? 3.5 : Math.pow(d.data.size, 2 / 5) || 1))

    //// SIMULATION ////

    console.log(links)

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(5)
          // .distance((d) => {
          //   console.log('d:', d)
          //   // return d.target.children ? 5 : 10
          //   return d.target.data.size ? Math.pow(d.target.data.size, 2 / 5) || 1 : 10
          // })
          //.distance((d) => (d.children ? 3.5 : Math.pow(d.data.size, 2 / 5) || 1))
          .strength(1)
          // .iterations(4)
      )
      // .force(
      //   'collide',
      //   d3.forceCollide().iterations(5).radius((d) => d.children ? 3.5 : Math.pow(d.data.size, 2 / 5) || 1)
      // )
      .force(
        'charge',
        d3.forceManyBody().strength((d) => (d.children ? -500 : -150))
      )
      // .force('center', d3.forceCenter())
      // TODO: maybe make strength proportional to number of nodes (nodes.length)
      .force('x', d3.forceX().strength(0.4))
      .force('y', d3.forceY().strength(0.4))
      // .force('radial', d3.forceRadial().radius(height / 2))
      .alphaDecay(0.0028)

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

      alpha.current.style.width = Math.floor(simulation.alpha() * 100) + '%'
      console.log(simulation.alphaMin())
    })

    //// DRAGGING ////

    const drag = (simulation) => {
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

    const tt = d3.select(tooltip.current)

    node
      .on('mouseover', () => {
        if (!dragging) tt.style('visibility', 'visible')
      })
      .on('mousemove', (e, d) => {
        tt.style('top', `${e.offsetY}px`)
          .style('left', `${e.offsetX}px`)
          .html(
            d.children ? d.data.name : `${d.data.name} (${d.data.size} loc)`
          )
      })
      .on('mouseout', () => tt.style('visibility', 'hidden'))


    //// CONTROLS ////

    const slide = d3.select(slider.current)
    // slide.on('change', (e) => console.log('change:', e))
    slide.on('input', (e) => {
      const percent = e.target.value / 100
      console.log('percent:', percent)

      // simulation
      //   .force('charge')
      //   .strength((d) => (d.children ? -120 * percent : -150 * percent))

      // simulation
      //   .force('link')
      //   .distance((d) => (d.children ? 40 * percent : 10 * percent))

      // simulation.force('x', d3.forceX().strength(0.4 * percent))
      // simulation.force('y', d3.forceY().strength(0.4 * percent))
      simulation.force('radial', d3.forceRadial().radius(height / 2).strength(percent))

      simulation.alpha(1).restart()

      // node.attr('r', (d) => (d.children ? 3.5 * percent : Math.pow(d.data.size, percent * 2 / 5) || 1))
    })

    const jiggle = d3.select(jiggler.current)

    jiggle.on('click', () => {
      simulation.alpha(0.8).restart()
    })

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

    const containerCurrent = container.current
    const tooltipCurrent = tooltip.current
    return () => {
      containerCurrent.innerHTML = ''
      tooltipCurrent.innerHTML = ''
    }
  }, [tree, languageIds, folderIds, getNodePath, dispatch])

  if (!tree) return null
  return (
    <>
      <div ref={container} className={classes.root} />
      <div ref={tooltip} className={classes.tooltip} />
      <div className={classes.controls}>
        <input
          type='range'
          ref={slider}
          min={0}
          max={500}
          defaultValue={100}
          style={{ width: '100%' }}
        />
        <button ref={jiggler}>jiggle</button>
      </div>
      <div className={classes.alphaBar}>
        <div className={classes.alphaInner} ref={alpha} />
      </div>
    </>
  )
}

export default ForceDirectedGraph
