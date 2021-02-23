import React, { useCallback, useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  saveSvgAsPng,
  svgAsDataUri,
} from 'save-svg-as-png'
import TextButton from 'components/core/TextButton'
import Slider from 'components/core/Slider'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
    textAlign: 'center',
  },
  preview: {
    display: 'none', //'inline-block',
    maxWidth: '100%',
    maxHeight: 300,
  },
  dimensions: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  slider: {
    marginTop: 20,
    width: 200,
    display: 'inline-block',
  },
  buttons: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}))

const nearestEven = (x) => 2 * Math.round(x / 2)

// returns the bounding box of the svg -- in the viewbox coordinate system
// -- plus the ratio of the viewBox size to the svg size
function getViewboxBoundingRect(svg) {
  const rect = svg.getBoundingClientRect()
  const matrix = svg.getCTM().inverse()

  // top-left corner of svg
  const pt0 = svg.createSVGPoint()
  pt0.x = 0
  pt0.y = 0
  const svgPt0 = pt0.matrixTransform(matrix)

  // bottom-right corner
  const pt1 = svg.createSVGPoint()
  pt1.x = rect.width
  pt1.y = rect.height
  const svgPt1 = pt1.matrixTransform(matrix)

  const width = svgPt1.x - svgPt0.x
  const height = svgPt1.y - svgPt0.y

  return {
    x: svgPt0.x,
    y: svgPt0.y,
    width,
    height,
    ratio: width / rect.width,
  }
}

const CameraControls = ({ flash }) => {
  const theme = useTheme()
  const classes = useStyles()
  const [svg, setSvg] = useState(null)
  const [dataUri, setDataUri] = useState(null)
  const [svgDimensions, setSvgDimensions] = useState(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    setTimeout(() => {
      const svg = document.querySelector('#fdg-container svg')
      setSvg(svg)
      setSvgDimensions(svg.getBoundingClientRect())
    })
  }, [])

  useEffect(() => {
    if (!svg) return

    const observer = new ResizeObserver(() => {
      setSvgDimensions(svg.getBoundingClientRect())
    })

    observer.observe(document.querySelector('#fdg-container'))

    return () => observer.disconnect()
  }, [svg])

  const snap = useCallback(() => {
    if (!svg) return

    svgAsDataUri(svg, {
      ...getViewboxBoundingRect(svg),
      excludeCss: true,
      encoderOptions: 1.0,
      backgroundColor: theme.palette.background.default,
      scale: 1,
    }).then(setDataUri)
  }, [svg, theme])

  const saveImage = useCallback(() => {
    if (!svg) return

    const {
      x: left,
      y: top,
      width,
      height,
      ratio,
    } = getViewboxBoundingRect(svg)

    const adjustedScale = scale / (window.devicePixelRatio * ratio)

    saveSvgAsPng(svg, 'image.png', {
      left,
      top,
      width,
      height,
      scale: adjustedScale,
      excludeCss: true,
      encoderOptions: 1.0,
      backgroundColor: theme.palette.background.default,
    })
  }, [svg, scale, theme])

  const takeSnapshot = useCallback(() => {
    flash()
    setTimeout(saveImage, 500)
  }, [flash, saveImage])

  if (!svgDimensions) return null
  return (
    <div className={classes.root}>
      <img alt='preview' className={classes.preview} src={dataUri} />
      <div className={classes.dimensions}>
        <span>width: {nearestEven(svgDimensions.width * scale)}</span>
        <span>height: {nearestEven(svgDimensions.height * scale)}</span>
      </div>
      <div className={classes.slider}>
        <Slider
          value={scale}
          onChange={setScale}
          range={[0.2, 5, 0.2]}
          label='scale'
          renderValue={x => x.toFixed(2)}
        />
      </div>
      <div className={classes.buttons}>
        <TextButton label='preview' onClick={snap} />
        <TextButton label='save' onClick={takeSnapshot} />
      </div>
    </div>
  )
}

export default CameraControls
