import { useEffect, useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as d3 from 'd3'
import { useVisPosition } from 'store/selectors'
import { setVisPosition } from 'store/actions/settings'

export default function useAddZoom({ svg, node, link }) {
  const dispatch = useDispatch()
  const visPosition = useVisPosition()
  const transformRef = useRef(null)
  const [zoom, setZoom] = useState(null)

  const setTransform = useCallback(
    (transform) => {
      const { x, y, k } = transform
      dispatch(setVisPosition({ x, y, k, source: 'wheel' }))
    },
    [dispatch]
  )

  useEffect(() => {
    if (!zoom || !visPosition || visPosition.source === 'wheel') return

    const { x, y, k } = visPosition
    const transform = d3.zoomIdentity.translate(x, y).scale(k)
    zoom.transform(svg, transform)
  }, [svg, zoom, visPosition])

  useEffect(() => {
    function zoomed({ transform }) {
      node.attr('transform', transform)
      link.attr('transform', transform)
    }

    function zoomedWheel({ transform }) {
      setTransform(transform)
    }

    function zoomEnd({ transform }) {
      transformRef.current = transform
    }

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 10])
      .on('zoom', zoomed)
      .on('zoom.wheel', zoomedWheel)
      .on('end', zoomEnd)

    zoom.transform(svg, transformRef.current || d3.zoomIdentity)
    svg.call(zoom)

    setZoom(() => zoom)

    return () => {
      zoom.on('zoom', null)
    }
  }, [svg, node, link, setTransform])
}
