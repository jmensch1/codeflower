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
    height: '100%',
    '& > #folders': {
      height: '100%',
    }
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

    let i = 0
    const root = d3.hierarchy(tree).eachBefore(d => d.id = i++)
    // const nodes = root.descendants()
    // const links = root.links()

    const container = document.getElementById('folders')
    const width = container.offsetWidth
    const height = container.offsetHeight

    const barHeight = 20
    const barWidth = width * .1

    i = 0
    let duration = 400

    const svg = d3
      .select(container)
      .append('svg')
      // .attr('viewBox', [
      //   -nodeSize / 2,
      //   -nodeSize * 3 / 2,
      //   width,
      //   (nodes.length + 1) * nodeSize
      // ])
      .attr('viewBox', [0, 0, width, height])
      .attr('font-size', 12)
      .style('overflow', 'visible')

    function update(source) {

      console.log('source', source)

      // Compute the flattened node list. TODO use d3.layout.hierarchy.
      // const nodes = source //root.descendants(); //returns a single node with the properties of d3.tree()
      // const nodesSort = nodes.descendants()
      let i = 0
      const nodesSort = source.eachBefore(d => d.id = i++).descendants()
      //
      d3.select("svg").transition().duration(duration)

      // returns all nodes and each descendant in pre-order traversal (sort)
      // nodes.eachBefore(function (n) {
      //    nodesSort.push(n);
      // });

      // Compute the "layout".
      nodesSort.forEach(function (n,i) {
        n.x = n.depth * 14
        n.y = i * barHeight;
      })
      //
      //
      // // Update the nodes…
      var node = svg.selectAll("g.node").data(nodesSort, (d) => d.id)
      //     .data(nodesSort, function(d) { return d.id || (d.id = ++i); }); //assigning id for each node
      //
      var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", `translate(${source.x}, ${source.y})`)
          .style("opacity", 1e-6);
      //
      // // Enter any new nodes at the parent's previous position.
      nodeEnter.append("rect")
          .attr("y", -barHeight / 2)
          .attr("height", barHeight)
          .attr("width", 100)
          .style("fill", color)
          .on("click", click);
      //
      nodeEnter.append("text")
          .attr("dy", 3.5)
          .attr("dx", 5.5)
          .text(d => d.data.name)
      //
      // // Transition nodes to their new position.
      nodeEnter.transition()
          .duration(duration)
          .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
          .style("opacity", 1);
      //
      node.transition()
          .duration(duration)
          .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
          .style("opacity", 1)
        .select("rect")
          .style("fill", color);
      //
      // // Transition exiting nodes to the parent's new position.
      node.exit().transition()
          .duration(duration)
          .attr("transform", `translate(${source.x}, ${source.y})`)
          .style("opacity", 1e-6)
          .remove();
      //
      // nodes.eachBefore(function (d) {
      //   d.x0 = d.x;
      //   d.y0 = d.y
      // });
    }

    // Initalize function
    update(root);


    // Toggle children on click.
    function click(e, d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }

    function color(d) {
      return d._children ? "#3182bd" : d.children ? "#c6dbef" : "lightgreen";
    }

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
