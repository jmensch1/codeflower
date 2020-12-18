import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { makeStyles } from '@material-ui/core/styles'
import { useTree, useLanguages } from 'store/selectors'
import { getFile } from 'store/files'
import { useDispatch } from 'react-redux'

const RADIUS_RATIO = 0.9
const PAD_ANGLE = 0 // 0.005

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    ...theme.visualization.default,
    ...theme.visualization.sunburst,
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

const Sunburst = () => {
  const container = useRef(null)
  const tooltip = useRef(null)
  const classes = useStyles()
  const tree = useTree()
  const dispatch = useDispatch()
  const { classes: langClasses } = useLanguages()

  useEffect(() => {
    if (!tree) return

    //// SETUP ////

    const width = container.current.offsetWidth
    const height = container.current.offsetHeight
    const radius = RADIUS_RATIO * Math.min(width, height) / 2

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
      .attr('viewBox', [-width / 2, -height / 2, width, height])

    const path = svg
      .append('g')
      .selectAll('path')
      .data(root.descendants().filter(d => d.depth))
      .join('path')
        .attr('class', d => !!d.children ? 'directory' : ('file ' + langClasses[d.data.language]))
        .attr('d', arc)

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

    //// TOOLTIP ////

    const tt = d3.select(tooltip.current)

    path
      .on('mouseover', () => tt.style('visibility', 'visible'))
      .on('mousemove', (e, d) => {
        tt
          .style('top', `${e.offsetY}px`)
          .style('left',`${e.offsetX}px`)
          .html(d.data.name)
      })
      .on('mouseout', () => tt.style('visibility', 'hidden'))

    //// ZOOMING ////

    svg.call(d3.zoom()
        .scaleExtent([0.1, 10])
        .on('zoom', zoomed))

    function zoomed({ transform }) {
      tt.style('visibility', 'hidden')
      path.attr('transform', transform)
    }

    //// GET FILE ////

    path.on('click', (e, d) => {
      if (d.children) return
      const filePath = d
        .ancestors()
        .map(d => d.data.name)
        .reverse()
        .join('/')
        .replace(/^root/, '')
      dispatch(getFile(filePath))
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

export default Sunburst
