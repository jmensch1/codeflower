import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useVisStyles } from 'store/selectors'
import { updateCamera } from 'store/actions/camera'

const ImageMaker = ({ svg, aperture }) => {
  const dispatch = useDispatch()
  const { fill: backgroundColor } = useVisStyles().background

  const getSvgUri = useCallback(async () => {
    const svgClone = svg.cloneNode(true)

    svgClone.removeAttribute('id')
    svgClone.removeAttribute('class')

    const { left, top, width, height } = aperture.viewBox
    svgClone.setAttribute('viewBox', `${left} ${top} ${width} ${height}`)

    const svgAsXML = (new XMLSerializer()).serializeToString(svgClone)
    return 'data:image/svg+xml;base64,' + btoa(svgAsXML)
  }, [svg, aperture])

  const getPngUri = useCallback(async (scale) => {
    console.log('gettiing png uri:', scale)
  }, [svg, aperture, backgroundColor])

  useEffect(() => {
    dispatch(updateCamera({ getSvgUri, getPngUri }))
  }, [dispatch, getSvgUri, getPngUri])

  return null
}

export default ImageMaker
