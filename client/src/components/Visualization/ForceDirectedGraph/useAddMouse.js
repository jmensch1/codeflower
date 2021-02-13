import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import * as d3 from 'd3'
import { openModal } from 'store/actions/modals'
import { useTooltip } from '../Tooltip'

export default function useAddMouse({ node, simulation }) {
  const dispatch = useDispatch()
  const setTooltip = useTooltip()

  const openFile = useCallback(
    (node) => {
      const { path: filePath, ...metadata } = node.data
      dispatch(openModal('fileViewer', { filePath, metadata }))
    },
    [dispatch]
  )

  useEffect(() => {
    if (!simulation || !node) return

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

    //// OPEN FILE ////

    node.on('click', (e, d) => {
      if (!d.children) openFile(d)
    })

    return () => {
      node.on('mousedown.drag', null)
      node.on('mousemove', null)
      node.on('mouseout', null)
      node.on('click', null)
    }
  }, [simulation, node, setTooltip, openFile])
}
