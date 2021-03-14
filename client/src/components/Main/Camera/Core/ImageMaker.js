import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useVisStyles } from 'store/selectors'
import { updateCamera } from 'store/actions/camera'

const ImageMaker = ({ svg, aperture }) => {
  const dispatch = useDispatch()
  const { fill: backgroundColor } = useVisStyles().background

  const getSvgUri = useCallback(() => {
    console.log('getting svg uri')
  }, [svg, aperture, backgroundColor])

  const getPngUri = useCallback((scale) => {
    console.log('gettiing png uri:', scale)
  }, [svg, aperture, backgroundColor])

  useEffect(() => {
    dispatch(updateCamera({ getSvgUri, getPngUri }))
  }, [dispatch, getSvgUri, getPngUri])

  return null
}

export default ImageMaker
