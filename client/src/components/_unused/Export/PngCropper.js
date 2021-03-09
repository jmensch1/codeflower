import React, { useEffect, useState, useCallback } from 'react'
import { useTheme } from '@material-ui/core/styles'
import { svgAsPngUri } from 'save-svg-as-png'
import { getSvgDimensions } from './utils'
import Cropper from 'react-easy-crop'

const PngCropper = ({ svg }) => {
  const [dataUri, setDataUri] = useState(null)
  const theme = useTheme()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])

  useEffect(() => {
    //if (!svg) return

    const svg = document.querySelector('#fdg-container svg')
    const scale = 2

    const { viewBox, ratio } = getSvgDimensions(svg)
    const adjustedScale = scale / (window.devicePixelRatio * ratio)

    svgAsPngUri(svg, {
      ...viewBox,
      scale: adjustedScale,
      excludeCss: true,
      encoderOptions: 1.0,
      backgroundColor: theme.palette.background.default,
    }).then(setDataUri)
  }, [theme])

  if (!dataUri) return null
  return (
    <Cropper
      image={dataUri}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      showGrid={false}
      style={{ maxWidth: '100%', maxHeight: '100%', display: 'block'}}
    />
  )

  // return (
  //   <img className={classes.image} alt='export' src={dataUri} />
  // )
}

export default PngCropper
