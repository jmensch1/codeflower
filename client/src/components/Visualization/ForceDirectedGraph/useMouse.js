import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTooltip } from '../Tooltip'
import * as d3 from 'd3'
import { openModal } from 'store/actions/modals'

export default function useMouse({ simulation, node, getNodePath }) {
  const setTooltip = useTooltip()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!simulation || !node) return

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

  }, [simulation, node, getNodePath, setTooltip, dispatch])
}
