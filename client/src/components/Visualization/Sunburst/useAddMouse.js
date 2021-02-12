import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { openModal } from 'store/actions/modals'
import { useTooltip } from '../Tooltip'

export default function useAddMouse({
  node,
  getNodePath,
}) {
  const dispatch = useDispatch()
  const setTooltip = useTooltip()

  const openFile = useCallback(
    (node) => {
      dispatch(
        openModal('fileViewer', {
          filePath: getNodePath(node),
          metadata: node.data,
        })
      )
    },
    [dispatch, getNodePath]
  )

  useEffect(() => {
    if (!node) return

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
      node.on('mousemove', null)
      node.on('mouseout', null)
      node.on('click', null)
    }
  }, [node, setTooltip, openFile])
}
