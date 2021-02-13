import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { makeStyles } from '@material-ui/core/styles'
import { useSelectedFolder } from 'store/selectors'
// import useAddStyles from './useAddStyles'
import useAddMouse from './useAddMouse'

const RADIUS_RATIO = 0.9
const PAD_ANGLE = 0 // 0.005

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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

const Enhancers = ({ visElements }) => {
  const {
    // svg,
    node,
  } = visElements

  // useAddStyles({ node, link: d3.selectAll('.hello') })
  // useAddForces({ simulation, nodes, links })
  useAddMouse({ node })
  // useAddZoom({ svg, node, link })

  return null
}

const Sunburst = ({ getFullPath }) => {
  const classes = useStyles()
  const tree = useSelectedFolder()
  const [visElements, setVisElements] = useState(null)

  useEffect(() => {
    if (!tree) return

    const container = document.getElementById('sunburst-container')
    const width = container.offsetWidth
    const height = container.offsetHeight
    const radius = (RADIUS_RATIO * Math.min(width, height)) / 2

    //// DATA ////

    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, PAD_ANGLE))
      .padRadius(radius / 2)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1 - 1)

    const partition = (data) =>
      d3.partition().size([2 * Math.PI, radius])(
        d3
          .hierarchy(data)
          .sum((d) => d.size)
          .sort((a, b) => b.size - a.size)
      )

    const root = partition(tree)

    //// DOM ////

    const svg = d3
      .select(container)
      .append('svg')
      .attr('viewBox', [-width / 2, -height / 2, width, height])

    const node = svg
      .append('g')
      .selectAll('path')
      .data(root.descendants().filter((d) => d.depth))
      .join('path')
      .attr('class', (d) => d.children ? 'folder' : 'file')
      .attr('d', arc)

    // const text = svg.append('g')
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

    //// ZOOMING ////

    svg.call(d3.zoom().scaleExtent([0.1, 10]).on('zoom', zoomed))

    function zoomed({ transform }) {
      node.attr('transform', transform)
      // text.attr('transform', transform)
    }

    //// FINISH ////

    setVisElements({ svg, node })
    return () => {
      container.innerHTML = ''
    }
  }, [tree])

  if (!tree) return null
  return (
    <>
      <div id="sunburst-container" className={classes.root} />
      {visElements && <Enhancers visElements={visElements} />}
    </>
  )
}

export default Sunburst
