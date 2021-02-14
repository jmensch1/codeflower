import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'
import {
  useRootFolder,
  useSelectedFolderPath,
  useHighlightedFolderPath,
} from 'store/selectors'
import { selectFolder, highlightFolder } from 'store/actions/settings'
// import { MAX_NODES } from 'constants.js'
import { isWithinFolder } from 'services/repo'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
}))

const Folders = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedFolderPath = useSelectedFolderPath()
  const highlightedFolderPath = useHighlightedFolderPath()
  const tree = useRootFolder()

  const select = useCallback(
    (folderPath) => {
      dispatch(selectFolder(folderPath))
    },
    [dispatch]
  )

  const highlight = useCallback(
    (folderPath) => {
      if (folderPath && isWithinFolder(folderPath, selectedFolderPath))
        dispatch(highlightFolder(folderPath))
      else
        dispatch(highlightFolder(null))
      //else if (highlightedFolderPath) dispatch(highlightFolder(null))
    },
    [dispatch, selectedFolderPath/*, highlightedFolderPath*/]
  )

  const clearHighlight = useCallback(() => {
    dispatch(highlightFolder(null))
  }, [dispatch])

  useEffect(() => {
    if (!tree) return

    const nodeSize = 17

    let i = -1
    const root = d3.hierarchy(tree).eachBefore(d => d.index = i++)
    const nodes = root.descendants()
    const links = root.links()

    const container = document.getElementById('folders')
    const width = container.offsetWidth
    const height = container.offsetHeight

    const svg = d3
      .select(container)
      .append('svg')
      .attr('viewBox', [
        -nodeSize / 2,
        -nodeSize * 3 / 2,
        width,
        (nodes.length + 1) * nodeSize
      ])
      .attr('font-size', 12)
      .style('overflow', 'visible')

    const link = svg
      .append('g')
        .attr('fill', 'none')
        .attr('stroke', '#fff')
      .selectAll('path')
      .data(links)
      .join('path')
        .attr('d', d => `
          M${d.source.depth * nodeSize},${(d.source.index) * nodeSize}
          V${d.target.index * nodeSize}
          h${nodeSize}
        `);

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
        .attr('transform', d => `translate(0,${(d.index) * nodeSize})`);

    node.append('circle')
        .attr('cx', d => d.depth * nodeSize)
        .attr('r', 2.5)
        .attr('fill', d => d.children ? '#fff' : '#fff');

    node.append('text')
        .attr('fill', '#fff')
        .attr('dy', '0.32em')
        .attr('x', d => d.depth * nodeSize + 6)
        .text(d => d.data.name);

    node.on('mouseover', (e, d) => {
      console.log('mouseover:', d)
      highlight(d.data.path)
    })

    // node.on('mouseout', (e, d) => {
    //   highlight(null)
    // })

    return () => {
      container.innerHTML = ''
    }
  }, [tree, highlight])

  return (
    <div className={classes.root}>
      <div id="folders" />
    </div>
  )
}

export default Folders
