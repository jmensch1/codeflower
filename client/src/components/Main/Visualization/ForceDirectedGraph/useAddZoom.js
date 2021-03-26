import { useEffect, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as d3 from 'd3'
import { useVisPosition } from 'store/selectors'
import { updateVisPosition } from 'store/actions/vis'

export default function useAddZoom({ svg, zoomG }) {
  const dispatch = useDispatch()
  const { zoom: transform } = useVisPosition()
  const [zoom, setZoom] = useState(null)

  const setTransform = useCallback(
    (transform) => {
      const { x, y, k } = transform
      dispatch(updateVisPosition('zoom', { x, y, k }))
    },
    [dispatch]
  )

  useEffect(() => {
    if (!zoom) return

    const t = d3.zoomIdentity
      .translate(transform.x, transform.y)
      .scale(transform.k)

    zoom.transform(svg, t)
  }, [svg, zoom, transform.x, transform.y, transform.k])

  useEffect(() => {
    function zoomed({ transform }) {
      zoomG.attr('transform', transform)
    }

    function zoomedWheel({ transform }) {
      setTransform(transform)
    }

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 10])
      .on('zoom', zoomed)
      .on('zoom.wheel', zoomedWheel)

    svg.call(zoom)

    setZoom(() => zoom)

    return () => {
      zoom.on('zoom', null)
    }
  }, [svg, zoomG, setTransform])
}
