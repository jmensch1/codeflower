import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { updateCamera } from 'store/actions/camera'
import { svgAsPngUri } from 'save-svg-as-png'

const ImageMaker = ({ svg, aperture }) => {
  const dispatch = useDispatch()

  const getSvgUri = useCallback(
    async () => {
      const svgClone = svg.cloneNode(true)

      const { left, top, width, height } = aperture.viewBox
      svgClone.setAttribute('viewBox', `${left} ${top} ${width} ${height}`)

      const svgAsXML = new XMLSerializer().serializeToString(svgClone)
      return 'data:image/svg+xml;base64,' + btoa(svgAsXML)
    },
    [svg, aperture]
  )

  const getPngUri = useCallback(
    async (scale) => {
      const { viewBox, screen } = aperture
      const ratio = viewBox.width / screen.width
      const adjustedScale = scale / (window.devicePixelRatio * ratio)

      return await svgAsPngUri(svg, {
        ...viewBox,
        scale: adjustedScale,
        excludeCss: true,
        encoderOptions: 1.0,
      })
    },
    [svg, aperture]
  )

  useEffect(() => {
    dispatch(updateCamera({ getSvgUri, getPngUri }))
  }, [dispatch, getSvgUri, getPngUri])

  return null
}

export default ImageMaker
