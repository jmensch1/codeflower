// import React, { useCallback, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { makeStyles } from '@material-ui/core/styles'
// import * as d3 from 'd3'
// import {
//   useRootFolder,
//   useSelectedFolderPath,
//   useHighlightedFolderPath,
// } from 'store/selectors'
// import { selectFolder, highlightFolder } from 'store/actions/settings'
// // import { MAX_NODES } from 'constants.js'
// import { isWithinFolder } from 'services/repo'
//
// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: 10,
//   },
// }))
//
// const Folders = () => {
//   const classes = useStyles()
//   const dispatch = useDispatch()
//   const selectedFolderPath = useSelectedFolderPath()
//   const highlightedFolderPath = useHighlightedFolderPath()
//   const tree = useRootFolder()
//
//   const select = useCallback(
//     (folderPath) => {
//       dispatch(selectFolder(folderPath))
//     },
//     [dispatch]
//   )
//
//   const highlight = useCallback(
//     (folderPath) => {
//       if (folderPath && isWithinFolder(folderPath, selectedFolderPath))
//         dispatch(highlightFolder(folderPath))
//       else
//         dispatch(highlightFolder(null))
//       //else if (highlightedFolderPath) dispatch(highlightFolder(null))
//     },
//     [dispatch, selectedFolderPath/*, highlightedFolderPath*/]
//   )
//
//   const clearHighlight = useCallback(() => {
//     dispatch(highlightFolder(null))
//   }, [dispatch])
//
//   useEffect(() => {
//     if (!tree) return
//
//     const nodeSize = 18
//
//     const root = d3.hierarchy(tree)
//
//     const container = document.getElementById('folders')
//     const width = container.offsetWidth
//     const height = container.offsetHeight
//
//     const svg = d3
//       .select(container)
//       .append('svg')
//       .attr('font-size', 12)
//       .style('overflow', 'visible')
//       .on('mouseout', () => highlight(null))
//
//     root.eachAfter((d) => {
//       if (d.depth > 0) {
//         d._children = d.children;
//         d.children = null;
//       }
//     })
//
//     function update(d) {
//       const nodes = []
//
//       root.eachBefore((d, index) => {
//         d.y = (index - 1) * nodeSize
//         nodes.push(d)
//       })
//
//       svg.attr('viewBox', [
//         -nodeSize / 2,
//         -nodeSize * 3 / 2,
//         width,
//         (nodes.length) * nodeSize
//       ])
//
//       const node = svg.selectAll('g.node').data(nodes, (d) => d.path)
//
//       const nodeEnter = node.enter().append('g').attr('class', 'node')
//
//       nodeEnter.append('rect')
//         .attr('width', width)
//         .attr('height', nodeSize - 2)
//         .style('fill', 'rgba(255, 0, 0, 0.2)')
//         .style('stroke', 'black')
//         .style('stroke-width', 1)
//         .attr('transform', `translate(-6, ${-nodeSize / 2 + 1})`)
//         .on('mouseover', (e, d) => highlight(d.data.path))
//
//       nodeEnter.append('circle')
//         .attr('cx', d => d.depth * nodeSize)
//         .attr('r', 2.5)
//         .attr('fill', d => d.children || d._children ? '#fff' : 'red');
//
//       nodeEnter.append('text')
//         .attr('fill', '#fff')
//         .attr('dy', '0.32em')
//         .attr('x', d => d.depth * nodeSize + 6)
//         .text(d => d.data.name)
//         .on('click', click)
//
//       node.merge(nodeEnter).attr('transform', d => `translate(0,${d.y})`)
//
//       node.exit().remove()
//     }
//
//     update(root)
//
//     function click(e, d) {
//       if (d.children) {
//         d._children = d.children;
//         d.children = null;
//       } else {
//         d.children = d._children;
//         d._children = null;
//       }
//       update(d);
//     }
//
//     return () => {
//       container.innerHTML = ''
//     }
//   }, [tree, highlight])
//
//   return (
//     <div className={classes.root}>
//       <div id="folders" />
//     </div>
//   )
// }
//
// export default Folders
